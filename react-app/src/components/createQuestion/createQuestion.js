import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { addQuestionThunk } from '../../store/questions'
import NavBar from "../NavBar";
import './createQuestion.css'

function CreateQuestion() {
    const sessionUser = useSelector((state) => state.session.user)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [errors, setErrors] = useState([])
    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
        if(content.length >= 500){
            setErrors(['Content is required and cannot be more than 500 characters'])
        }else{
            setErrors([])
        }
    }, [content])

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
            return
        } else {
            history.push(`/questions`)
        }
    }



    return (
        <div className="createQuestion-container">
            <div className='navbar-divider'></div>
            <NavBar />
            <h1 className="createQuestion logo landing-logo">Create a New Question</h1>
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
                    <button type="cancel" onClick={(e) => {
                        e.preventDefault()
                        history.push('/')
                    }}>Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default CreateQuestion