import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import EditAnswer from '../editAnswer/editAnswer'

function SingleAnswer({ answerId }) {
  const sessionUser = useSelector(state => state.session.user)
  const answer = useSelector(state => state.answers[answerId])
  const [answerFormOpen, setAnswerFormOpen] = useState(false)
  const [answerContent, setAnswerContent] = useState(answer?.content || '')
  const answerUser = useSelector(state => state.users[answer?.user_id])

  useEffect(() => {

    setAnswerContent(answer?.content)
  }, [answer, setAnswerContent])

  return (
    <div className='singleAnswerDisplay'>
      <p>{answerUser?.username}'s answer</p>
      <div className='answerContent-edit-btn'>
        <div className='answerContent'>{answerContent}</div>
        {sessionUser && sessionUser?.id === answer?.user_id && <button onClick={() => setAnswerFormOpen(!answerFormOpen)}>Edit Answer</button>}
        {answerFormOpen && <EditAnswer setAnswerFormOpen={setAnswerFormOpen} answer={answer} />}
      </div>
    </div>
  )
}

export default SingleAnswer