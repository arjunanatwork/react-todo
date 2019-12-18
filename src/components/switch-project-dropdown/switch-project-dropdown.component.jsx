import React from 'react';
import { connect } from 'react-redux';

import SwitchProjectDropdownItem from "../switch-project-dropdown-items/switch-project-dropdown-items.component";

import './switch-project-dropdown.scss';
import {changeProjectAsync, toggleEditTask} from "../../redux/task/task.action";

const SwitchProjectDropdown = ({task, projects, changeProjectAsync, toggleEditTask}) => {

    // Change the Project
    const changeProject = (projectId) => {
        changeProjectAsync(task.id, projectId); // Change project action
        toggleEditTask();
    };

    return (
        <div className="custom-dropdown-menu" id="dropdown-menu" role="menu">
            <div className="dropdown-content">
                {projects.map((project) => (<SwitchProjectDropdownItem key={project.id} project={project} changeProject={changeProject} />))}
            </div>
        </div>
    )
};

const mapDispatchToProps = (dispatch) => ({
    changeProjectAsync: (taskId, projectId) => dispatch(changeProjectAsync(taskId, projectId)),
    toggleEditTask: () => dispatch(toggleEditTask())
});
export default connect(null, mapDispatchToProps)(SwitchProjectDropdown);