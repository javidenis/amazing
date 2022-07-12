import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Home() {
    const questions = Object.values(useSelector(state => state.questions)).reverse()

    return (
        <div>
            <h1>Recent Questions</h1>
            <div>
                {questions.map(question => (
                    <div>
                        <Link to={`/questions/${question.id}`} key={question.id}>{question.title}</Link>
                        <div>{question.content}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home
