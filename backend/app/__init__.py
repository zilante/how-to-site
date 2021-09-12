from flask import Flask
from app import db, auth, question, answer


def create_app():
    # create and configure the app
    app = Flask(__name__)
    app.config.from_mapping(
        DEBUG=True,
        SECRET_KEY='dev',
        DB_HOST='mysqldb',
        DB_USER='root',
        DB="how_to_site_db",
        DB_USER_PASSWORD="p@ssw0rd1",
        CORS_HEADERS='Content-Type',
    )

    # a simple page that says hello
    @app.route('/hello')
    def hello():
        return 'Hello, World!'

    db.init_app(app)
    app.register_blueprint(auth.bp)
    app.register_blueprint(question.bp)
    app.register_blueprint(answer.bp)

    return app
