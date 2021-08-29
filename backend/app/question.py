from flask import (
    Blueprint, flash, g, redirect, render_template, request, url_for, jsonify
)
from flask_cors import CORS, cross_origin
from werkzeug.exceptions import abort

from app.auth import login_required
from app.db import get_db

bp = Blueprint('question', __name__)
CORS(bp, supports_credentials=True,
     resources={r"/*": {"origins": "http://frontend:3000"}})


@bp.route('/questions')
@cross_origin(origin='frontend', supports_credentials=True,
              headers=['Content-Type'])
def get_questions():
    cursor = get_db().cursor(dictionary=True)

    cursor.execute(
        'SELECT q.id, title, body, created, author_id, username'
        ' FROM question q JOIN user u ON q.author_id = u.id'
        ' ORDER BY created DESC'
    )
    questions = cursor.fetchall()
    cursor.close()

    return jsonify({'questions': questions}), 200


@bp.route('/create_question', methods=['POST'])
@cross_origin(origin='frontend', supports_credentials=True,
              headers=['Content-Type'])
@login_required
def create_question():
    title = request.json['title']
    body = request.json['body']
    error = ''

    if not title:
        error = 'Title is required.'

    if not error:
        db = get_db()
        cursor = db.cursor()
        cursor.execute(
            'INSERT INTO question (title, body, author_id)'
            ' VALUES (%s, %s, %s)',
            (title, body, g.user['id'])
        )

        cursor.close()
        db.commit()

        return jsonify({'message': 'Successfully created question!'}), 200

    return jsonify({'message': error}), 400


def get_question_from_db(id, check_author=True):
    cursor = get_db().cursor(dictionary=True)
    cursor.execute(
        'SELECT q.id, title, body, created, author_id, username'
        ' FROM question q JOIN user u ON q.author_id = u.id'
        ' WHERE q.id = %s',
        (id,)
    )
    question = cursor.fetchone()
    cursor.close()

    # if question is None:
    #     abort(404, f"Question id {id} doesn't exist.")

    # if check_author and question['author_id'] != g.user['id']:
    #     abort(403)

    return question


@bp.route('/question/<int:id>')
@cross_origin(origin='frontend', supports_credentials=True,
              headers=['Content-Type'])
def get_question(id):
    question = get_question_from_db(id)
    if question is None:
        return jsonify({'message': "Question id {} doesn't exist."\
                       .format(id)}), 404

    cursor = get_db().cursor(dictionary=True)
    cursor.execute(
        'SELECT a.id, body, created, username'
        ' FROM answer a JOIN user u ON a.author_id = u.id'
        ' WHERE question_id = %s'
        ' ORDER BY created DESC',
        (id,)
    )
    answers = cursor.fetchall()
    cursor.close()

    return jsonify({'question': question, 'answers': answers}), 200


@bp.route('/<int:id>/update_question', methods=('GET', 'POST'))
@login_required
def update_question(id):
    question = get_question_from_db(id, True)

    if request.method == 'POST':
        title = request.form['title']
        body = request.form['body']
        error = None

        if not title:
            error = 'Title is required.'

        if error is not None:
            flash(error)
        else:
            db = get_db()
            cursor = db.cursor()

            cursor.execute(
                'UPDATE question SET title = %s, body = %s'
                ' WHERE id = %s',
                (title, body, id)
            )

            cursor.close()
            db.commit()

            return redirect(url_for('question.index'))

    # to be discussed
    return render_template('blog/update.html', post=question)


@bp.route('/<int:id>/delete_question', methods=('POST',))
@login_required
def delete_question(id):
    get_question_from_db(id, True)

    db = get_db()
    cursor = db.cursor()

    cursor.execute('DELETE FROM question WHERE id = %s', (id,))

    cursor.close()
    db.commit()

    return redirect(url_for('question.index'))
