from .db import db
from sqlalchemy.orm import relationship

class Question(db.Model):
    __tablename__ = 'questions'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    content = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    user = db.relationship("User", back_populates='questions')
    answers = db.relationship("Answer", back_populates='questions',cascade="delete, all", foreign_keys='Answer.question_id')
    up_votes = db.relationship('Up_vote', back_populates='questions',cascade="delete, all")

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'content': self.content,
            'user_id': self.user_id
        }