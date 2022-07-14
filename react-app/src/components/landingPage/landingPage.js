import React from 'react'
import { Link } from 'react-router-dom'
import LoginForm from '../auth/LoginForm'
import SignUpForm from '../auth/SignUpForm'
import './landingPage.css'

function LandingPage() {
    return (
        <div className='container-container'>
            <div className='logo about-title'>A place where you can get all your questions answered.</div>
            <div className='container-contained'>
                <h1 className='logo landing-logo'>Query</h1>
                <div className='landing-container'>
                    <SignUpForm />
                    <div className='divider'></div>
                    <LoginForm />
                </div>
            </div>
            <div className='github-linkedin-links'>
                <div className='logo'>About the Developer</div>
                <div className='links'>
                    <a href='https://github.com/javidenis/query'><i class="fa-brands fa-github"></i>Github</a>
                    <a href='https://www.linkedin.com/in/jorge-denis-9749b1198/'><i class="fa-brands fa-linkedin"></i>Linked-in</a>
                </div>
            </div>
        </div>
    )
}

export default LandingPage
