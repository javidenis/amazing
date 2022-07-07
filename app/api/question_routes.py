from flask import Blueprint, jsonify
from flask_login import login_required
# from app.models import
# from app.forms import

question_routes = Blueprint('questions', __name__)