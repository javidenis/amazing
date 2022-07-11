import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import CreateAnswer from '../createAnswer/createAnswer';

import SingleAnswer from '../singleAnswerDisplay/singleAnswer';

function SingleQuestion() {
  const questionId = useParams()?.id
  const thisQuestion = useSelector(state => state?.questions)[questionId]
  const sessionUser = useSelector(state => state.session.user)
  const history = useHistory()
  const answers = Object.values(useSelector(state => state.answers))
  const thisAnswers = answers.filter(answer => Number(answer.question_id) === Number(questionId))
  const [answerFormOpen, setAnswerFormOpen] = useState(false)

  const handleEditButton = () => {
    history.push(`/questions/${questionId}/edit`)
  }

  return (
    <div>
      <div>
        <div>{sessionUser?.id === thisQuestion?.user_id && <button onClick={() => handleEditButton()}>Edit Question</button>}</div>
        <h1>{thisQuestion?.title}</h1>
        <div>{thisQuestion?.content}</div>
      </div>
      <h2>Answers</h2>
      <div>
        <div>
          <p> {sessionUser?.username}, answer the question "{thisQuestion?.title}".</p>
          {sessionUser && <button onClick={() => setAnswerFormOpen(!answerFormOpen)}>Create an Answer</button>}
          {answerFormOpen && sessionUser && <CreateAnswer thisQuestion={thisQuestion} setAnswerFormOpen={setAnswerFormOpen} />}
        </div>
      </div>
      <div>
        {thisAnswers.length < 1 && <p>No Answers yet!</p>}
        {thisAnswers && thisAnswers.map(answer => <SingleAnswer key={answer.id} answerId={answer.id} />)}
      </div>
    </div>
  )
}

export default SingleQuestion