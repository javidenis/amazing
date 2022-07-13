import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './HomeSingleQuestion.css'

function HomeSingleQuestion({ question }) {
    const sessionUser = useSelector(state => state.session.user)
    const questionUser = useSelector(state => state.users[question?.user_id])

    return (
        <div className='single-question'>
            <div className='username'>{questionUser.username}'s Question</div>
            <Link className='home-question-title' to={`/questions/${question.id}`} key={question.id}>{question.title}</Link>
            <div className='home-question-content'>{question.content}</div>
        </div>
    )
}

export default HomeSingleQuestion
