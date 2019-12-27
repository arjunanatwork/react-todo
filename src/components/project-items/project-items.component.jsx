import React from 'react';
import {connect, useDispatch, useSelector} from "react-redux";

import {deleteProjectStartAsync, editProjectModal, toggleBurgerMenuAction} from "../../redux/project/project.action";
import {fetchTasksByProject, toggleAddTask, toggleEditTask} from "../../redux/task/task.action";
import {selectGetTasks, selectToggleAddTask, selectToggleEditTask} from "../../redux/task/task.selector";
import {selectToggleBurgerMenu} from "../../redux/project/project.selector";
import {selectCurrentUser} from "../../redux/user/user.selector";

import './project-items.styles.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {createStructuredSelector} from "reselect";

const ProjectItem = ({project, currentUser, toggleAddTaskSelector, toggleBurgerMenu}) => {

    const dispatch = useDispatch();
    const {hidden: isEditTaskHidden, index} = useSelector(selectToggleEditTask);

    const deleteProject = (e) => {
        e.stopPropagation();
        dispatch(deleteProjectStartAsync(project.id, currentUser.id))
    };

    const editProject = (e) => {
        e.stopPropagation();
        dispatch(editProjectModal(project));
    };

    const fetchTasks = () => {
        if(toggleBurgerMenu) // Hide Burger Menu if Enabled
            dispatch(toggleBurgerMenuAction());

        if(toggleAddTaskSelector) // Hide Add Task if Enabled
            dispatch(toggleAddTask());

        if(!isEditTaskHidden) // Hide Edit Task if Enabled
            dispatch(toggleEditTask(index));


        dispatch(fetchTasksByProject(project))
    };

    return (
        <li className="prj-item" onClick={fetchTasks}>
            <a href="#">
                <div className="prj-item-container">
                    <div className="prj-name">
                        {project.name}
                    </div>
                    <div className="prj-actions">
                        <span className="icon prj-icon-delete has-text-grey" onClick={deleteProject}>
                         <FontAwesomeIcon icon="trash"/>
                    </span>
                        <span className="icon prj-icon-edit has-text-grey" onClick={editProject}>
                         <FontAwesomeIcon icon="edit"/>
                    </span>
                    </div>
                </div>
            </a>
        </li>
    )
};

const mapStateToProps = createStructuredSelector({
    currentUser : selectCurrentUser,
    toggleAddTaskSelector: selectToggleAddTask,
    toggleBurgerMenu: selectToggleBurgerMenu
});
export default connect(mapStateToProps)(ProjectItem)
