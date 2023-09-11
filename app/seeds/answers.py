from app.models import db, Answer

def seed_answers():
  answer3 = Answer(content="That's something a billionaire would say", question_id= 2, user_id= 2)
  answer4 = Answer(content="If I were you, I wouldn't visit the Amazon River", question_id= 3, user_id= 2)
  answer5 = Answer(content="Dude just buy another toilet...", question_id= 4, user_id= 1)
  answer7 = Answer(content="People just care about getting a video viral and get 'famous' for a second before helping", question_id= 3, user_id= 2)
  answer8 = Answer(content="That's probably on the bible", question_id= 5, user_id= 2)
  answer9 = Answer(content="Human as Homo sapiens or all the way back to Homo naledi? And I know a question as an answer for another question but you need to specify more", question_id= 5, user_id= 1)
 
  db.session.add(answer3)
  db.session.add(answer4)
  db.session.add(answer5)
  db.session.add(answer7)
  db.session.add(answer8)
  db.session.add(answer9)
  
  db.session.commit()

def undo_seedanswers():
    db.session.execute('TRUNCATE answers RESTART IDENTITY CASCADE;')
    db.session.commit()
