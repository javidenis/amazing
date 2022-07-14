from app.models import db, Question

def seed_questions():
  question2 = Question(title="I'm not a billionaire but I'm curious", content="Where do billionaires invest when there's high inflation?", user_id= 3)
  question3 = Question(title="I'm visitng the Amazon River tomorrow", content="Is it safe to swim in the Amazon River? Even if it is safe, what are the factors that make it safe for us to swim in the Amazon River?", user_id= 2)
  question4 = Question(title="Just bought a house", content="How do I get rid of toilet stains?", user_id= 1)
  question6 = Question(title="Are bystanders who film rather than intervene actually helpful?", content="There are so many videos online of people that could have used some help from the person filming the actual video", user_id= 2)
  question7 = Question(title="Who was the first human to die?", content="The first that we know of at least", user_id= 1)

  db.session.add(question2)
  db.session.add(question3)
  db.session.add(question4)
  db.session.add(question6)
  db.session.add(question7)
  
  db.session.commit()

def undo_seedquestions():
    db.session.execute('TRUNCATE questions RESTART IDENTITY CASCADE;')
    db.session.commit()
