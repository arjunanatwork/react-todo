import React from 'react'
import appLogo from '../../assets/images/todo-icon.png'
import HeaderMenu from "../header-menu/header-menu.component";
import {isMobile} from "react-device-detect";
import {useDispatch, useSelector} from "react-redux";
import {selectToggleBurgerMenu} from "../../redux/project/project.selector";
import {toggleBurgerMenuAction} from "../../redux/project/project.action";

const Header = () => {

    const dispatch = useDispatch();
    const toggleBurgerMenu = useSelector(selectToggleBurgerMenu);

    return (
        <nav className={`navbar is-primary  ${isMobile ? 'is-fixed-top':''}`} role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <div className="navbar-item" href="#">
                    <img src={appLogo} alt="App Logo" height="28"/>
                </div>
                <div href="#" role="button" className={`navbar-burger ${toggleBurgerMenu ? 'is-active':''}`} aria-label="menu"
                   aria-expanded="false" onClick={() => dispatch(toggleBurgerMenuAction())}>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </div>
            </div>
            <HeaderMenu toggleBurgerMenu={toggleBurgerMenu}/>
        </nav>
    )
};

export default Header;
