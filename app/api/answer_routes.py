from flask import Blueprint, request, jsonify
from flask_login import login_required
from app.models import Answer, db
from app.forms.new_answer_form import NewAnswerForm

answer_routes = Blueprint('answers', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
   

@answer_routes.route('')
def get_all_answer():
    answers = Answer.query.all()
    return {"answers": [answer.to_dict() for answer in answers]}

@answer_routes.route('', methods=['POST'])
@login_required
def post_answer():
    form = NewAnswerForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_answer = Answer(
            content=form.data['content'],
            question_id=form.data['question_id'],
            user_id=form.data['user_id']
        )
        db.session.add(new_answer)
        db.session.commit()
        return new_answer.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@answer_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_answer(id):    
    form = NewAnswerForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        edit_answer = Answer.query.get(id)

        edit_answer.content=form.data['content']
        edit_answer.question_id=form.data['question_id']
        edit_answer.user_id=form.data['user_id']

        db.session.commit()
        return edit_answer.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@answer_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_answer(id):
    answer = Answer.query.get(id)
    db.session.delete(answer)
    db.session.commit()
    return {'Successful': 'Successful'}