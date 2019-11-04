import React from 'react'
import appLogo from '../../assets/images/todo-icon.png'

const Header = () => {

    return (
        <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <a className="navbar-item" href="https://bulma.io">
                    <img src={appLogo} alt="App Logo" height="28"/>
                </a>
                <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>
        </nav>
    )
}

export default Header;
