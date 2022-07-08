from flask import Blueprint, request, jsonify
from flask_login import login_required
from app.models import Question, db
from app.forms.new_question_form import NewQuestionForm

question_routes = Blueprint('questions', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
   

@question_routes.route('')
def get_all_question():
    questions = Question.query.all()
    return {"questions": [question.to_dict() for question in questions]}

@question_routes.route('', methods=['POST'])
@login_required
def post_question():
    form = NewQuestionForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_question = Question(
            title=form.data['title'],
            content=form.data['content'],
            user_id=form.data['user_id']
        )
        db.session.add(new_question)
        db.session.commit()
        return new_question.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

