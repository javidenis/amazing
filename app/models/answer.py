from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship

class Answer(db.Model):
    __tablename__ = 'answers'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    question_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('questions.id')), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    user = db.relationship("User", back_populates='answers')
    questions = db.relationship("Question", back_populates='answers', foreign_keys='Answer.question_id')

    def to_dict(self):
        return {
            'id': self.id,
            'content': self.content,
            'question_id': self.question_id,
            'user_id': self.user_id
        }