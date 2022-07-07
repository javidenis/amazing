from .db import db
from sqlalchemy.orm import relationship

class Up_vote(db.Model):
    __tablename__ = 'up_votes'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    question_id = db.Column(db.Integer, db.ForeignKey('questions.id'), nullable=False)

    user = db.relationship("User", back_populates='up_votes')
    questions = db.relationship("Question", back_populates='up_votes')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'question_id': self.question_id
        }