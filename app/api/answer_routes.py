from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Answer
# from app.forms import

answer_routes = Blueprint('answers', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@answer_routes.route('/')
def get_all_answer():
    answers = Answer.query.all()
    return {"answers": [answer.to_dict() for answer in answers]}
