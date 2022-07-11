import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addAnswerThunk } from '../../store/answers';

function CreateAnswer({ thisQuestion, setAnswerFormOpen }) {
  const sessionUser = useSelector(state => state.session.user)
  const question_id = thisQuestion.id
  const [content, setContent] = useState('')
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch()

  const handleOnSubmit = async (e) => {
    e.preventDefault()
    const user_id = sessionUser?.id
    const newAnswer = {
      content,
      user_id,
      question_id
    }

    const data = await dispatch(addAnswerThunk(newAnswer))
    if (data) {
      setErrors(data)
    } else {
      setAnswerFormOpen(false)
    }
  }

  const handleCancel = e => {
    setAnswerFormOpen(false)
  }

  return (
    <form onSubmit={e => handleOnSubmit(e)}>
      {errors.length > 0 &&
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
      }
      <label>What would be your answer?</label>
      <textarea onChange={e => setContent(e.target.value)} id='cotent-input' type='text' placeholder='Enter your answer' value={content}></textarea>
      <div>
        <button>Submit Answer</button>
        <button onClick={e => handleCancel(e)}>Cancel</button>
      </div>
    </form>
  )
}

export default CreateAnswer