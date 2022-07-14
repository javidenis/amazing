import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { deleteQuestionThunk, editQuestionThunk } from '../../store/questions';
import Navbar from '../NavBar'
import './editQuestion.css'

function EditQuestion() {
    const sessionUser = useSelector(state => state.session.user)
    const questionId = useParams()?.id
    const thisQuestion = useSelector(state => state?.questions)[questionId]
    const [title, setTitle] = useState(thisQuestion.title)
    const [content, setContent] = useState(thisQuestion.content)
    const [errors, setErrors] = useState([])
    const history = useHistory()
    const dispatch = useDispatch()
    const [deleteDisplay, setDeleteDisplay] = useState(false)

    useEffect(() => {
        if (content.length >= 500) {
            setErrors(['Content is required and cannot be more than 500 characters'])
        } else {
            setErrors([])
        }
    }, [content])

    if (sessionUser?.id !== thisQuestion?.user_id) {
        history.push('/questions')
    }

    const handleDelete = async () => {
        await dispatch(deleteQuestionThunk(questionId))
        history.push('/')
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault()
        const user_id = sessionUser.id

        const newQuestion = {
            title,
            content,
            user_id,
            questionId
        }

        const data = await dispatch(editQuestionThunk(newQuestion))

        if (data) {
            setErrors(data)
        } else {
            history.push(`/questions/${questionId}`)
        }
    }

    const handleCancel = () => {

        history.push(`/questions/${questionId}`)
    }

    return (
        <div>
            <div className='navbar-divider'></div>
            <Navbar />
            <h1 className="createQuestion logo landing-logo">Edit your Question</h1>
            <form className="createQuestion-form" onSubmit={e => handleOnSubmit(e)}>
                {errors.length > 0 &&
                    <ul>
                        <p>Please fix the following errors:</p>
                        {errors.map((error, idx) => <li className='errors' key={idx}>{error}</li>)}
                    </ul>
                }
                <div className="question-inputs createQuestion-title">
                    <label>Question Title:</label>
                    <input
                        name='title'
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        type='text'
                        placeholder="Question Title Here"
                    >
                    </input>
                </div>
                <div className="question-inputs">
                    <label>Question Content:</label>
                    <textarea
                        name='content'
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        type='text'
                        placeholder="Question Content Here"
                    >
                    </textarea>
                </div>
                <div className="question-inputs createQuestion-btns">
                    <button disabled={!!errors.length} type="submit">Submit</button>
                    <button onClick={() => handleCancel()}>Cancel</button>
                    <button onClick={(e) => {
                        e.preventDefault()
                        setDeleteDisplay(!deleteDisplay)
                    }}>Delete</button>
                </div>
                {deleteDisplay &&
                    <div className='deleteQuestion-confirmation'>
                        <p>Are you sure you want to delete this Question?</p>
                        <div className='deleteQuestion-confirmation-btns'>
                            <button onClick={() => handleDelete()}>Confirm Delete</button>
                            <button onClick={() => setDeleteDisplay(!deleteDisplay)}>Cancel Delete</button>
                        </div>
                    </div>
                }
            </form>

        </div>
    )
}

export default EditQuestion