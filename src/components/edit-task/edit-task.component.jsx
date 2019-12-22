import React, { useState } from 'react';
import {useDispatch, useSelector} from "react-redux";
import {toggleEditTask, updateTaskStartAsync} from "../../redux/task/task.action";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './edit-task.component.scss';
import SwitchProjectDropdown from "../switch-project-dropdown/switch-project-dropdown.component";
import {selectGetProjects, selectSwitchProjectDropdownHidden} from "../../redux/project/project.selector";
import {toggleSwitchProjectDropdownHidden} from "../../redux/project/project.action";
import {isMobile} from "react-device-detect";

const EditTask = ({task}) => {

    const switchProjectDropdownHidden = useSelector(selectSwitchProjectDropdownHidden);
    const projects = useSelector(selectGetProjects);

    const dispatch = useDispatch();
    const [taskDetail, setTaskDetail] = useState(task.detail);
    const [scheduledOn, setScheduledOn] = useState(task.scheduledOn ? task.scheduledOn.toDate() : null);

    // Custom Task Schedule
    const TaskSchedule = ({ value, onClick }) => (
        <input className="input task-schedule" placeholder='Schedule' type="text" onClick={onClick} value={value}/>
    );

    // Update Task Details
    const updateTask = () => {
        dispatch(updateTaskStartAsync(task.id, {...task, detail:taskDetail, scheduledOn: scheduledOn}));
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
            <div className="task-details-container">
                <input className="input task-input" type="text" placeholder="Task Detail" value={taskDetail} onChange={(e) => setTaskDetail(e.target.value)}/>
                {isMobile ? (<DatePicker withPortal dateFormat="dd/MM/yyyy" showPopperArrow={false} selected={scheduledOn} onChange={date => setScheduledOn(date)}  customInput={<TaskSchedule />}/>)
                    : (<DatePicker dateFormat="dd/MM/yyyy" showPopperArrow={false} selected={scheduledOn} onChange={date => setScheduledOn(date)}  customInput={<TaskSchedule />}/>) }
            </div>
            <div className="edit-task-action-container">
                <div className={`buttons is-marginless ${isMobile ? 'are-small': null }`}>
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
                </div>
            </div>
        </div>
    )
};

export default EditTask;
