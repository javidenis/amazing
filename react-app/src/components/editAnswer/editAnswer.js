import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { editAnswerThunk, deleteAnswerThunk } from '../../store/answers';

function EditAnswer({ answer, setAnswerFormOpen }) {
  const questionId = useParams().id
  const thisQuestion = useSelector(state => state.questions)[questionId]
  const question_id = thisQuestion.id
  const sessionUser = useSelector(state => state.session.user)
  const [content, setContent] = useState(answer.content)
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
    <form className='editAnswerForm' onSubmit={e => handleOnSubmit(e)}>
      <div className='editAnswer-inputs'>
        <div className='editAnswerTextArea'>
          {errors.length > 0 &&
            <ul>
              {errors.map((error, idx) => <li className='errors' key={idx}>{error}</li>)}
            </ul>
          }
          <label>Answer</label>
          <textarea onChange={e => setContent(e.target.value)} type='text' placeholder='Your Answer Here' value={content}></textarea>
        </div>
        <div className='submitEditAnswer-btns'>
          <button disabled={!!errors.length}>Submit Answer</button>
          <button onClick={e => handleDelete(e)}>Delete Answer</button>
          <button onClick={e => handleCancel(e)}>Cancel</button>
        </div>
      </div>
    </form>
  )
}

export default EditAnswer
