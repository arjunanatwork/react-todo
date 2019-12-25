import React from 'react';
import './project-items.styles.scss';

import {useDispatch, useSelector} from "react-redux";
import {deleteProjectStartAsync, editProjectModal, toggleBurgerMenuAction} from "../../redux/project/project.action";
import {fetchTasksByProject, toggleAddTask, toggleEditTask} from "../../redux/task/task.action";
import {selectToggleAddTask, selectToggleEditTask} from "../../redux/task/task.selector";
import {selectToggleBurgerMenu} from "../../redux/project/project.selector";

const ProjectItem = ({project}) => {

    const dispatch = useDispatch();
    const {hidden: isEditTaskHidden, index} = useSelector(selectToggleEditTask);
    const toggleAddTaskSelector = useSelector(selectToggleAddTask);
    const toggleBurgerMenu = useSelector(selectToggleBurgerMenu);

    const deleteProject = (e) => {
        e.stopPropagation();
        dispatch(deleteProjectStartAsync(project.id))
    };

    const editProject = (e) => {
        e.stopPropagation();
        dispatch(editProjectModal(project));
    };

    const fetchTasks = () => {
        if(toggleBurgerMenu)
            dispatch(toggleBurgerMenuAction());

        if(toggleAddTaskSelector)
            dispatch(toggleAddTask());

        if(!isEditTaskHidden)
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
                        <i className="fas fa-trash"></i>
                    </span>
                        <span className="icon prj-icon-edit has-text-grey" onClick={editProject}>
                        <i className="fas fa-edit"></i>
                    </span>
                    </div>
                </div>
            </a>
        </li>
    )
};

export default ProjectItem
