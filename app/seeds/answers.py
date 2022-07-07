from app.models import db, Answer

def seed_answers():
  answer1 = Answer(content='This is an answer', question_id= 1, user_id= 1)
 
  db.session.add(answer1)
  
  db.session.commit()

def undo_seedanswers():
    db.session.execute('TRUNCATE answers RESTART IDENTITY CASCADE;')
    db.session.commit()
