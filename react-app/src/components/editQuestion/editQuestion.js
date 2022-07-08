import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams} from 'react-router-dom';
import { deleteQuestionThunk, editQuestionThunk } from '../../store/questions';

function EditQuestion() {
    const sessionUser = useSelector(state => state.session.user)
    const questionId = useParams()?.id
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [errors, setErrors] = useState([])
    const history = useHistory()
    const dispatch = useDispatch()
    const [deleteDisplay, setDeleteDisplay] = useState(false)

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
            <h1>Edit your Question</h1>
            <form onSubmit={e => handleOnSubmit(e)}>
                {errors.length > 0 &&
                    <ul>
                        <p>Please fix the following errors:</p>
                        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                }
                <label>Question Title:</label>
                <input
                    name='title'
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    type='text'
                    placeholder="Question Title Here"
                >
                </input>
                <label>Question Content:</label>
                <input
                    name='content'
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    type='text'
                    placeholder="Question Content Here"
                >
                </input>
                <button type="submit">Submit</button>
                <button onClick={()=> handleCancel()}>Cancel</button>
                <button onClick={(e) => {
                    e.preventDefault()
                    setDeleteDisplay(!deleteDisplay)
                }}>Delete</button>
            </form>
            {deleteDisplay &&
                <div>
                    <p>Are you sure you want to delete this Book?</p>
                    <div>
                        <button onClick={() => handleDelete()}>Confirm Delete</button>
                        <button onClick={() => setDeleteDisplay(!deleteDisplay)}>Cancel Delete</button>

                    </div>
                </div>

            }
        </div>
    )
}

export default EditQuestion