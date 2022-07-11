from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, Field
from wtforms.validators import DataRequired, ValidationError


class ListField(Field):
    def process_formdata(self, valuelist):
        self.data = valuelist

def check_content_len(form, field):
    content = field.data
    if len(content) < 1 and len(content) > 500:
        raise ValidationError('Content is required and cannot be more than 500 characters')

class NewAnswerForm(FlaskForm):
    content = StringField('content', validators=[DataRequired('Content is required and cannot be more than 500 characters'), check_content_len])
    question_id = IntegerField('question_id', validators=[DataRequired()])
    user_id = IntegerField('user_id', validators=[DataRequired()])
