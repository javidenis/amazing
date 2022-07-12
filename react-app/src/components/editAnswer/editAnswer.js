import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { editAnswerThunk, deleteAnswerThunk } from '../../store/answers';

function EditAnswer({ answer, setAnswerFormOpen }) {
  const questionId = useParams().id
  const thisQuestion = useSelector(state => state.questions)[questionId]
  const question_id = thisQuestion.id
  const sessionUser = useSelector(state => state.session.user)
  const [content, setContent] = useState('')
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch()

  const handleOnSubmit = async (e) => {
    e.preventDefault()

    const newAnswer = {
      content,
      user_id: sessionUser.id,
      question_id,
      answerId: answer.id

    }

    const data = await dispatch(editAnswerThunk(newAnswer))
    if (data) {
      setErrors(data)
    } else {
      setAnswerFormOpen(false)
    }
  }

  const handleCancel = e => {
    setAnswerFormOpen(false)
  }

  const handleDelete = async e => {
    e.preventDefault()
    await dispatch(deleteAnswerThunk(answer.id))
  }

  return (
    <form onSubmit={e => handleOnSubmit(e)}>
      {errors.length > 0 &&
        <ul>
          {errors.map((error, idx) => <li className='errors' key={idx}>{error}</li>)}
        </ul>
      }
      <label>Answer</label>
      <textarea onChange={e => setContent(e.target.value)} id='cotent-input' type='text' placeholder='Your Answer Here' value={content}></textarea>
      <div>
        <button>Submit Answer</button>
        <button onClick={e => handleDelete(e)}>Delete Answer</button>
        <button onClick={e => handleCancel(e)}>Cancel</button>
      </div>
    </form>
  )
}

export default EditAnswer
