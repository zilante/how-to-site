import os

from flask import Flask
from flask_cors import CORS

from app import db, auth, question, answer


def create_app():
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    # CORS(app)

    app.config.from_mapping(
        SECRET_KEY='dev',
        DB_HOST='mysqldb',
        DB_USER='root',
        DB_USER_PASSWORD="p@ssw0rd1",
        DB="how_to_site_db",
    )

    app.config['CORS_HEADERS'] = 'Content-Type'
    app.config.from_pyfile('config.py', silent=True)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    # a simple page that says hello
    @app.route('/hello')
    def hello():
        return 'Hello, World!'

    db.init_app(app)
    app.register_blueprint(auth.bp)
    app.register_blueprint(question.bp)
    app.register_blueprint(answer.bp)
    # app.add_url_rule('/', endpoint='index')

    return app
