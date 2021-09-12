from flask import (Blueprint, g, request, jsonify)
from flask_cors import CORS, cross_origin

from app.auth import login_required
from app.db import get_db

bp = Blueprint('answer', __name__)
CORS(bp, supports_credentials=True,
     resources={r"/*": {"origins": "http://frontend:3000"}})


@bp.route('/<int:id>/create_answer', methods=['POST'])
@cross_origin(origin='frontend', supports_credentials=True,
              headers=['Content-Type'])
@login_required
def create_answer(id):
    body = request.json['body']
    error = ''

    if not body:
        error = 'Body is required.'

    if not error:
        db = get_db()
        cursor = db.cursor()

        cursor.execute(
            'INSERT INTO answer (author_id, question_id, body)'
            ' VALUES (%s, %s, %s)',
            (g.user['id'], id, body)
        )

        cursor.close()
        db.commit()

        return jsonify({'message': 'Successfully created answer!'}), 200

    return jsonify({'message': error}), 400


def get_answer_from_db(id):
    cursor = get_db().cursor(dictionary=True)
    cursor.execute(
        'SELECT a.id, body, created, author_id, username'
        ' FROM answer a JOIN user u ON a.author_id = u.id'
        ' WHERE a.id = %s',
        (id,)
    )
    answer = cursor.fetchone()
    cursor.close()

    return answer


@bp.route('/<int:id>/update_answer', methods=['POST'])
@cross_origin(origin='frontend', supports_credentials=True,
              headers=['Content-Type'])
@login_required
def update_answer(id):
    answer = get_answer_from_db(id)
    if g.user['id'] != answer['author_id']:
        return jsonify({'message': \
                "You can update only your answers!"}), 403

    body = request.json['body']
    error = ''

    if not body:
        error = 'Body is required.'

    if not error:
        db = get_db()
        cursor = db.cursor()

        cursor.execute(
            'UPDATE answer SET body = %s'
            ' WHERE id = %s',
            (body, id)
        )

        cursor.close()
        db.commit()

        return jsonify({'message': 'Successfully updated answer!'}), 200

    return jsonify({'message': error}), 400


@bp.route('/<int:id>/delete_answer', methods=['POST'])
@cross_origin(origin='frontend', supports_credentials=True,
              headers=['Content-Type'])
@login_required
def delete_answer(id):
    answer = get_answer_from_db(id)
    if g.user['id'] != answer['author_id']:
        return jsonify({'message': \
                "You can delete only your answers!"}), 403

    db = get_db()
    cursor = db.cursor()

    cursor.execute('DELETE FROM answer WHERE id = %s', (id,))

    cursor.close()
    db.commit()

    return jsonify({'message': 'Successfully deleted answer!'}), 200
