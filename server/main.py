import os
from flask import Flask
from flask import render_template
from flask.ext.security import Security, SQLAlchemyUserDatastore
from flask.ext.sqlalchemy import SQLAlchemy
from flask.ext.security import UserMixin, RoleMixin, login_required

here = os.path.dirname( os.path.realpath( __file__ ) )
root = os.path.dirname( here )

app = Flask(__name__)

client_dir = "%s/client/" % root
app.static_folder = client_dir
app.template_folder = root

app.config['SECRET_KEY'] = 'qVYjsJ8051e9X6h42hdC1S2LLSMGI6'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root@127.0.0.1/test'

# Create database connection object
db = SQLAlchemy(app)

# Define models
roles_users = db.Table('roles_users',
    db.Column('user_id', db.Integer(), db.ForeignKey('user.id')),
    db.Column('role_id', db.Integer(), db.ForeignKey('role.id'))
)


class Role(db.Model, RoleMixin):
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(80), unique=True)
    description = db.Column(db.String(255))


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), unique=True)
    password = db.Column(db.String(255))
    active = db.Column(db.Boolean())
    confirmed_at = db.Column(db.DateTime())
    roles = db.relationship('Role', secondary=roles_users,
                            backref=db.backref('users', lazy='dynamic'))

# Setup Flask-Security
user_datastore = SQLAlchemyUserDatastore(db, User, Role)
security = Security(app, user_datastore)


# Create a user to test with
@app.before_first_request
def create_user():
    db.create_all()
    user_datastore.create_user(email='foo@bar', password='123')
    db.session.commit()


@app.route('/')
@login_required
def hello_world():
    return render_template("index.html")

if __name__ == '__main__':
    app.run(debug = True)
