from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, Field
from wtforms.validators import DataRequired, ValidationError


class ListField(Field):
    def process_formdata(self, valuelist):
        self.data = valuelist

def check_title_len(form, field):
    title = field.data
    if len(title) > 200:
        raise ValidationError('Title cannot be more than 200 characters')

def check_content_len(form, field):
    content = field.data
    if len(content) < 1 and len(content) > 500:
        raise ValidationError('Content is required and cannot be more than 500 characters')

class NewQuestionForm(FlaskForm):
    title = StringField('title', validators=[DataRequired('Title cannot be more than 200 characters'), check_title_len])
    content = StringField('content', validators=[DataRequired('Content is required and cannot be more than 500 characters'),check_content_len])
    user_id = IntegerField('user_id', validators=[DataRequired()])
