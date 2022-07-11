import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import './NavBar.css'

const NavBar = () => {
    return (
        <nav className='navbar'>
            <div className='navbar-left'>
                <div>
                    <NavLink to='/' exact={true} activeClassName='active'>
                        <i className="fa-solid fa-house" title="Home"></i>
                    </NavLink>
                </div>
                <div>
                    <NavLink to='/questions/new' exact={true} activeClassName='active'>
                    <i className="fa-solid fa-pen-to-square" title="Create Question"></i>
                    </NavLink>
                </div>
            </div>
            <div className='navbar-right'>
                <LogoutButton />
            </div>
        </nav>
    );
}

export default NavBar;
