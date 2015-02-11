from flask import Flask
from flask.ext.security import Security, SQLAlchemyUserDatastore

import router
from app.users import models as UserModels

from controllers import pages


def create_app(config_filename):
    app = Flask(__name__)
    app.config.from_object(config_filename)

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
