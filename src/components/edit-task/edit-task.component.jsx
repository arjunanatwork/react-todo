import React, { useState } from 'react';
import {useDispatch, useSelector} from "react-redux";
import {toggleEditTask, updateTaskStartAsync} from "../../redux/task/task.action";

import './edit-task.component.scss';
import SwitchProjectDropdown from "../switch-project-dropdown/switch-project-dropdown.component";
import {selectGetProjects, selectSwitchProjectDropdownHidden} from "../../redux/project/project.selector";
import {toggleSwitchProjectDropdownHidden} from "../../redux/project/project.action";

const EditTask = ({task}) => {

    const switchProjectDropdownHidden = useSelector(selectSwitchProjectDropdownHidden);
    const projects = useSelector(selectGetProjects);

    const dispatch = useDispatch();
    const [taskDetail, setTaskDetail] = useState(task.detail);

    // Update Task Details
    const updateTask = () => {
        dispatch(updateTaskStartAsync(task.id, {...task, detail:taskDetail}));
        dispatch(toggleEditTask());
        if(!switchProjectDropdownHidden)
            dispatch(toggleSwitchProjectDropdownHidden())
    };

    // Called when Cancel is clicked
    const cancelUpdate = () => {
        dispatch(toggleEditTask());
        if(!switchProjectDropdownHidden)
            dispatch(toggleSwitchProjectDropdownHidden())
    };

    return (
        <div className="edit-task-detail has-margin-bottom-20">
            <input className="input" type="text" placeholder="Task Detail" value={taskDetail} onChange={(e) => setTaskDetail(e.target.value)}/>
            <div className="edit-task-action-container">
                <div className="buttons is-marginless">
                    <button className="button is-primary" onClick={updateTask}>Update Task</button>
                    <button className="button" onClick={cancelUpdate}>Cancel</button>
                </div>
                <div className="other-actions">
                    <div className={`dropdown ${ !switchProjectDropdownHidden ? 'is-active': ''}`}>
                        <div className="dropdown-trigger">
                            <span className="icon" onClick={() => dispatch(toggleSwitchProjectDropdownHidden())}>
                              <i className="fas fa-list fa-lg"></i>
                            </span>
                        </div>
                        <SwitchProjectDropdown task={task} projects={projects.filter(project => project.id != task.projectId)}/>
                    </div>
                    <span className="icon">
                      <i className="fas fa-calendar-day fa-lg"></i>
                    </span>
                </div>
            </div>
        </div>
    )
};

export default EditTask;
