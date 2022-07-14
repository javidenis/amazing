import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import CreateAnswer from '../createAnswer/createAnswer';
import NavBar from '../NavBar';
import SingleAnswer from '../singleAnswerDisplay/singleAnswer';
import './questions.css'

function SingleQuestion() {
  const questionId = useParams()?.id
  const thisQuestion = useSelector(state => state?.questions)[questionId]
  const sessionUser = useSelector(state => state.session.user)
  const history = useHistory()
  const answers = Object.values(useSelector(state => state.answers))
  const thisAnswers = answers.filter(answer => Number(answer.question_id) === Number(questionId))
  const [answerFormOpen, setAnswerFormOpen] = useState(false)
  const questionUser = useSelector(state => state.users[thisQuestion?.user_id])

  const handleEditButton = () => {
    history.push(`/questions/${questionId}/edit`)
  }

  return (
    <div className='singleQuestion-Container'>
      <div className='navbar-divider'></div>
      <NavBar />
      <div>
        <div className='title-container'>
          <h1 className='title-title-container'>{thisQuestion?.title}</h1>
          <div className='editQuestion-btn'>{sessionUser?.id === thisQuestion?.user_id && <button onClick={() => handleEditButton()}>Edit Question</button>}</div>
        </div>
        <div className='usernameContent-container'>
          <div className='username-singleQuestion'>{questionUser.username}'s Question</div>
          <div className='content-singleQuestion'>{thisQuestion?.content}</div>
        </div>
      </div>
      <div className='createAnswer-title'>
        <div className='createAnswer-btn'>
          {sessionUser && <button onClick={() => setAnswerFormOpen(!answerFormOpen)}>Create an Answer</button>}
          {answerFormOpen && sessionUser && <CreateAnswer thisQuestion={thisQuestion} setAnswerFormOpen={setAnswerFormOpen} />}
        </div>
      </div>
      <h2 className='logo'>Answers</h2>
      <div className='answers-container'>
        {thisAnswers.length < 1 && <p>No Answers yet!</p>}
        {thisAnswers && thisAnswers.map(answer => <SingleAnswer key={answer.id} answerId={answer.id} />)}
      </div>
    </div>
  )
}

export default SingleQuestion