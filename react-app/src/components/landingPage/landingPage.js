import React from 'react'
import LoginForm from '../auth/LoginForm'
import SignUpForm from '../auth/SignUpForm'
import './landingPage.css'

function LandingPage() {
    return (
        <div className='container-container'>
            <div className='container-contained'>
                <h1 className='logo landing-logo'>Query</h1>
                <div className='landing-container'>
                    <SignUpForm />
                    <div className='divider'></div>
                    <LoginForm />
                </div>
            </div>
        </div>
    )
}

export default LandingPage
