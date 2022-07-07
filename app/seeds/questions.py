from app.models import db, Question

def seed_questions():
  question1 = Question(title='This is a question', content='This is the content of the question', user_id= 1)
 
  db.session.add(question1)
  
  db.session.commit()

def undo_seedquestions():
    db.session.execute('TRUNCATE questions RESTART IDENTITY CASCADE;')
    db.session.commit()
