import React from 'react';
import {connect, useDispatch, useSelector} from "react-redux";
import {createStructuredSelector} from "reselect";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {fetchTasksForAWeek, fetchTasksForDefaultProject, fetchTasksForToday, fetchOverdueTask} from "../../redux/task/task.action";
import {toggleBurgerMenuAction} from "../../redux/project/project.action";
import {selectCurrentUser} from "../../redux/user/user.selector";
import {selectToggleBurgerMenu} from "../../redux/project/project.selector";

const DefaultMenuItems = ({currentUser}) => {
    const dispatch = useDispatch();
    const toggleBurgerMenu = useSelector(selectToggleBurgerMenu);

    const fetchDefaultTasks = () => {
        dispatch(fetchTasksForDefaultProject(currentUser.id));
        if(toggleBurgerMenu)
            dispatch(toggleBurgerMenuAction());
    };

    const fetchTodayTasks = () => {
        dispatch(fetchTasksForToday(currentUser.id));
        if(toggleBurgerMenu)
            dispatch(toggleBurgerMenuAction());
    };

    const fetchWeekTasks = () => {
        dispatch(fetchTasksForAWeek(currentUser.id));
        if(toggleBurgerMenu)
            dispatch(toggleBurgerMenuAction());
    };

    const fetchOverdueTasks = () => {
        dispatch(fetchOverdueTask(currentUser.id));
        if(toggleBurgerMenu)
            dispatch(toggleBurgerMenuAction());
    };

    return (
        <ul className="menu-list">
            <li onClick={fetchDefaultTasks}>
                <a href="#"><span className="icon has-margin-right-5" style={{color:'#246fe0'}}><FontAwesomeIcon icon="inbox"/></span>Inbox</a>
            </li>
            <li onClick={fetchTodayTasks}>
                <a href="#"><span className="icon has-margin-right-5" style={{color: '#058527'}}><FontAwesomeIcon icon="calendar-check"/></span>Today</a>
            </li>
            <li onClick={fetchWeekTasks}>
                <a href="#"><span className="icon has-margin-right-5" style={{color: '#692fc2'}}><FontAwesomeIcon icon="calendar-alt"/></span>Next 7 days</a>
            </li>
            <li onClick={fetchOverdueTasks}>
                <a href="#"><span className="icon has-margin-right-5" style={{color: '#8b0000'}}><FontAwesomeIcon icon="calendar-times"/></span>Overdue</a>
            </li>
        </ul>
    );
};
const mapStateToProps = createStructuredSelector({
    currentUser : selectCurrentUser
});
export default  connect(mapStateToProps)(DefaultMenuItems);
