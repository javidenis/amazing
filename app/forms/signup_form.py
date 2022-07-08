from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User

def username_length(form, field):
    username = field.data
    if len(username) > 40:
        raise ValidationError('Username is too long. (Maximum length is 40)')

def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')

def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

def check_length(form, field):
    checking = field.data
    if len(checking) > 50:
        raise ValidationError('Password is too long. (Maximum length is 50).')

def check_password(form, field):
    checking = field.data
    if len(checking) < 7:
        raise ValidationError('Password must be more than 6 characters.')

class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists, username_length])
    email = StringField('email', validators=[DataRequired(), user_exists])
    password = StringField('password', validators=[DataRequired(), check_password, check_length])
