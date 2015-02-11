from flask import Flask, current_app
from flask.ext.security import Security, SQLAlchemyUserDatastore

import router
from app.users import models as UserModels

from controllers.pages import HomeView

# TODO: initial creation of database and first user


def create_app(config_filename):
    app = Flask(__name__)
    with app.app_context():
        app.config.from_object(config_filename)

        app.static_folder = app.config.get("STATIC_FOLDER")
        app.template_folder = app.config.get("TEMPLATE_FOLDER")


        UserModels.db.init_app(app)

        # Setup Flask-Security
        user_datastore = SQLAlchemyUserDatastore(
            UserModels.db,
            UserModels.User,
            UserModels.Role
        )
        Security(app, user_datastore)

        # Routes
        router.apply_routes(app)

        return app
