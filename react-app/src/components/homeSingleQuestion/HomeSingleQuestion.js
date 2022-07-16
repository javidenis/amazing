import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './HomeSingleQuestion.css'
import { getQuestionsThunk } from '../../store/questions';
import { getAllUsersThunk } from '../../store/users';

function HomeSingleQuestion({ question }) {
    const questionUser = useSelector(state => state.users[question?.user_id])
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllUsersThunk())
        dispatch(getQuestionsThunk())
    }, [])

    return (
        <div className='single-question'>
            <div className='username'>{questionUser.username}'s Question</div>
            <Link className='home-question-title' to={`/questions/${question.id}`} key={question.id}>{question.title}</Link>
            <div className='home-question-content'>{question.content}</div>
        </div>
    )
}

export default HomeSingleQuestion
