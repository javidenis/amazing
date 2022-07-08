import React, { useState } from "react";
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { addQuestionThunk } from '../../store/questions'

function CreateQuestion() {
    const sessionUser = useSelector((state) => state.session.user)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [errors, setErrors] = useState([])
    const history = useHistory()
    const dispatch = useDispatch()

    const handleOnSubmit = async (e) => {
        e.preventDefault()
        const user_id = sessionUser.id

        const newQuestion = {
            title,
            content,
            user_id
        }

        const data = await dispatch(addQuestionThunk(newQuestion))
        if (data) {
            setErrors(data)
        } else {
            history.push(`/questions/`)
        }
    }

    return (
        <div>
            <h1>Create a New Question</h1>
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
                <button type="cancel" onClick={(e) => {
                    e.preventDefault()
                    history.push('/')
                }}>Cancel</button>
            </form>
        </div>
    )
}

export default CreateQuestion