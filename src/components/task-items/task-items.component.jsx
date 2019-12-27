import React, {Fragment} from 'react';
import {useDispatch, useSelector} from "react-redux";

import EditTask from "../edit-task/edit-task.component";
import {deleteTaskStartAsync, toggleAddTask, toggleEditTask, updateTaskStartAsync} from "../../redux/task/task.action";
import {selectToggleAddTask, selectToggleEditTask} from "../../redux/task/task.selector";

import './task-items.styles.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const TaskItem = ({task, index}) => {

    const dispatch = useDispatch();
    const toggleEditTaskSelector = useSelector(selectToggleEditTask);
    const toggleAddTaskSelector = useSelector(selectToggleAddTask);

    const toggleEditTaskAction = () => {
        if(toggleAddTaskSelector) {
            dispatch(toggleAddTask())
        }

        if(!toggleEditTaskSelector.hidden) {
            dispatch(toggleEditTask(toggleEditTaskSelector.index));
        }

        dispatch(toggleEditTask(index));
    };

    // Delete a Task
    const deleteTaskAction = () => {
        dispatch(deleteTaskStartAsync(task.id));
    };

    // Change the Task completed State
    const handleTaskCheckboxChange = (e) => {
        dispatch(updateTaskStartAsync(task.id, {...task, isCompleted: e.target.checked ? 1:0 }));
    };

    return (
        <Fragment>
            <div className="task-item-details" style={{ display : (toggleEditTaskSelector.index === index && !toggleEditTaskSelector.hidden) ? 'none': 'flex'}}>
                <div className="field is-marginless">
                    <input className="is-checkradio is-primary" id={`taskDetail_${task.id}`} type="checkbox"
                           name={`taskDetail_${task.id}`} checked={!!task.isCompleted} onChange={handleTaskCheckboxChange}/>
                    <label htmlFor={`taskDetail_${task.id}`}>
                        {
                            !!task.isCompleted ? (<s>{task.detail}</s>) : (task.detail)
                        }
                    </label>
                </div>
                <div className="task-item-action">
                    <span className="icon has-text-grey task-icon-edit" onClick={toggleEditTaskAction}>
                            <FontAwesomeIcon icon="edit"/>
                    </span>
                    <span className="icon has-text-grey task-icon-delete" onClick={deleteTaskAction}>
                             <FontAwesomeIcon icon="trash"/>
                    </span>
                </div>
            </div>
            { (toggleEditTaskSelector.index === index && !toggleEditTaskSelector.hidden) ? <EditTask task={task}/> : null }
        </Fragment>
    )
};

export default TaskItem;
