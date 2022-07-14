import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addAnswerThunk } from '../../store/answers';

function CreateAnswer({ thisQuestion, setAnswerFormOpen }) {
  const sessionUser = useSelector(state => state.session.user)
  const question_id = thisQuestion.id
  const [content, setContent] = useState('')
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch()

  useEffect(() => {
    if (content.length >= 500) {
      setErrors(['Content is required and cannot be more than 500 characters'])
    } else {
      setErrors([])
    }
  }, [content])

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
    <form className='answerForm' onSubmit={e => handleOnSubmit(e)}>
      <div className='answer-inputs'>
        <div className='answerTextArea'>
          {errors.length > 0 &&
            <ul>
              {errors.map((error, idx) => <li className='errors' key={idx}>{error}</li>)}
            </ul>
          }
          <label>What would be your answer?</label>
          <textarea onChange={e => setContent(e.target.value)} type='text' placeholder='Enter your answer' value={content}></textarea>
        </div>
        <div className='submitAnswer-btns'>
          <button disabled={!!errors.length}>Submit Answer</button>
          <button onClick={e => handleCancel(e)}>Cancel</button>
        </div>
      </div>
    </form>
  )
}

export default CreateAnswer