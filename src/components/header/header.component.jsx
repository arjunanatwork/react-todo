import React, {useState} from 'react'
import appLogo from '../../assets/images/todo-icon.png'
import HeaderMenu from "../header-menu/header-menu.component";
import {isMobile} from "react-device-detect";

const Header = () => {

    const [burgerToggle, setBurgerToggle] = useState(false);

    return (
        <nav className={`navbar is-primary  ${isMobile ? 'is-fixed-top':''}`} role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <div className="navbar-item" href="#">
                    <img src={appLogo} alt="App Logo" height="28"/>
                </div>
                <div href="#" role="button" className={`navbar-burger ${burgerToggle ? 'is-active':''}`} aria-label="menu"
                   aria-expanded="false" onClick={() => setBurgerToggle(!burgerToggle)}>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </div>
            </div>
            <HeaderMenu burgerToggle={burgerToggle}/>
        </nav>
    )
};

export default Header;
