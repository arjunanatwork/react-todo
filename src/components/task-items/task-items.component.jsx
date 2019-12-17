import React, {Fragment} from 'react';
import './task-items.styles.scss'
import {useDispatch, useSelector} from "react-redux";
import {deleteTaskStartAsync, toggleAddTask, toggleEditTask, updateTaskStartAsync} from "../../redux/task/task.action";
import EditTask from "../edit-task/edit-task.component";
import {selectToggleAddTask, selectToggleEditTask} from "../../redux/task/task.selector";

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

    const deleteTaskAction = () => {
        dispatch(deleteTaskStartAsync(task.id));
    };

    const handleTaskCheckboxChange = (e) => {
        dispatch(updateTaskStartAsync(task.id, {...task, isCompleted: e.target.checked ? 1:0 }));
    };

    return (
        <Fragment>
            <div className="task-item-details" style={{ display : (toggleEditTaskSelector.index == index && !toggleEditTaskSelector.hidden) ? 'none': 'flex'}}>
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
                    <span className="icon task-icon-edit" onClick={toggleEditTaskAction}>
                            <i className="fas fa-edit"></i>
                    </span>
                    <span className="icon task-icon-delete" onClick={deleteTaskAction}>
                            <i className="fas fa-trash"></i>
                    </span>
                </div>
            </div>
            { (toggleEditTaskSelector.index == index && !toggleEditTaskSelector.hidden) ? <EditTask task={task}/> : null }
        </Fragment>
    )
};

export default TaskItem;
