import React, { useState } from 'react';
import {useDispatch} from "react-redux";
import {toggleEditTask, updateTaskStartAsync} from "../../redux/task/task.action";

const EditTask = ({task}) => {

    const dispatch = useDispatch();
    const [taskDetail, setTaskDetail] = useState(task.detail);

    const updateTask = () => {
        dispatch(updateTaskStartAsync(task.id, taskDetail));
        setTaskDetail('');
        dispatch(toggleEditTask());
    };

    const cancelUpdate = () => {
        setTaskDetail('');
        dispatch(toggleEditTask());
    };

    return (
        <div className="edit-task-detail has-margin-bottom-20">
            <input className="input" type="text" placeholder="Task Detail" value={taskDetail} onChange={(e) => setTaskDetail(e.target.value)}/>
            <div className="edit-task-action">
                <div className="buttons">
                    <button className="button is-primary" onClick={updateTask}>Update Task</button>
                    <button className="button" onClick={cancelUpdate}>Cancel</button>
                </div>
            </div>
        </div>
    )
};

export default EditTask;
