import React, {Fragment} from 'react';
import {auth} from "../../firebase/firebase.util";
import {useDispatch, useSelector} from "react-redux";
import {selectToggleBurgerMenu} from "../../redux/project/project.selector";
import {toggleBurgerMenuAction} from "../../redux/project/project.action";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Settings = () => {

    const dispatch = useDispatch();
    const toggleBurgerMenu = useSelector(selectToggleBurgerMenu);

    const logout = () => {
        if(toggleBurgerMenu)
            dispatch(toggleBurgerMenuAction());
        auth.signOut().then(r => console.log("SignOut Successful"));
    };

    return(
        <Fragment>
            <ul className="menu-list">
                <li onClick={logout}>
                    <a href="#"><span className="icon has-margin-right-5"><FontAwesomeIcon icon="sign-out-alt"/></span>Logout</a>
                </li>
            </ul>
        </Fragment>
    );
};

export default Settings;