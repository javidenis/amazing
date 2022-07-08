import React from 'react'
import { useSelector } from 'react-redux';
import { useHistory, useParams} from 'react-router-dom';

import SingleAnswer from '../singleAnswerDisplay/singleAnswer';

function SingleQuestion() {
  const questionId = useParams()?.id
  const thisQuestion = useSelector(state => state?.questions)[questionId]
  const sessionUser = useSelector(state => state.session.user)
  const history = useHistory()
  const answers = Object.values(useSelector(state => state.answers))
  const thisAnswers = answers.filter(answer => Number(answer.question_id) === Number(questionId))

  const handleEditButton = () => {
    history.push(`/questions/${questionId}/edit`)
  }

  return (
    <div>
      <div>
        <div>{sessionUser?.id === thisQuestion?.user_id && <button id='single-question-edit-button' onClick={() => handleEditButton()}>Edit Question</button>}</div>
        <div>{thisQuestion.title}</div>
        <div>{thisQuestion.content}</div>
      </div>
      <div>
        {thisAnswers.length < 1 && <p>No Answers yet!</p>}
        {thisAnswers && thisAnswers.map(answer => <SingleAnswer key={answer.id} answerId={answer.id} />)}
      </div>
    </div>
  )
}

export default SingleQuestion