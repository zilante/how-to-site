import functools

from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for, jsonify
)
from flask_cors import cross_origin, CORS
from mysql.connector import errors
from werkzeug.security import check_password_hash, generate_password_hash

from app.db import get_db

bp = Blueprint('auth', __name__, url_prefix='/auth')
CORS(bp, supports_credentials=True,
     resources={r"/auth/*": {"origins": "http://frontend:3000"}})


@bp.route('/register', methods=['POST'])
@cross_origin(origin='frontend', supports_credentials=True,
              headers=['Content-Type'])
def register():
    name = request.json['name']
    surname = request.json['surname']
    username = request.json['username']
    password = request.json['password']
    db = get_db()
    error = ''

    if not username:
        error = 'Username is required.'
    elif not password:
        error = 'Password is required.'
    elif not name:
        error = 'Name is required.'
    elif not surname:
        error = 'Surname is required.'

    if not error:
        try:
            cursor = db.cursor()
            cursor.execute(
                "INSERT INTO user (name, surname, username, password) \
                 VALUES (%s, %s, %s, %s)",
                (name, surname, username, generate_password_hash(password)),
            )
            cursor.close()
            db.commit()
        except errors.IntegrityError:
            error = "User {} is already registered.".format(username)
            return jsonify({'message': error}), 409
        else:
            return jsonify({'message': 'successfully registered!'}), 200

    return jsonify({'message': error}), 400


@bp.route('/login', methods=['POST'])
@cross_origin(origin='frontend', supports_credentials=True,
              headers=['Content-Type'])
def login():
    username = request.json['username']
    password = request.json['password']

    db = get_db()
    cursor = db.cursor(dictionary=True,)
    error = ''

    cursor.execute(
        'SELECT * FROM user WHERE username = %s', (username,)
    )
    user = cursor.fetchone()

    if user is None:
        error = 'Incorrect username.'
    elif not check_password_hash(user['password'], password):
        error = 'Incorrect password.'

    if not error:
        session.clear()
        session['user_id'] = user['id']

        return jsonify({'message': 'successfully logged in!'}), 200

    return jsonify({'message': error}), 400


@bp.before_app_request
def load_logged_in_user():
    user_id = session.get('user_id')

    if user_id is None:
        g.user = None
    else:
        cursor = get_db().cursor(dictionary=True)
        cursor.execute(
            'SELECT * FROM user WHERE id = %s', (user_id,),
        )
        g.user = cursor.fetchone()
        cursor.close()


@bp.route('/logout')
@cross_origin(origin='frontend', supports_credentials=True,
              headers=['Content-Type'])
def logout():
    session.clear()

    return jsonify({'message': 'successfully logged out!'}), 200


def login_required(view):
    @functools.wraps(view)
    def wrapped_view(**kwargs):
        if g.user is None:
            return jsonify({'message': 'log in firstly!'}), 401

        return view(**kwargs)

    return wrapped_view
