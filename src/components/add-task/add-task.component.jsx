import React, {Fragment, useState} from 'react';
import {connect, useSelector} from "react-redux";
import {selectCurrentUser} from "../../redux/user/user.selector";
import {addTaskStartAsync, toggleAddTask, toggleEditTask} from "../../redux/task/task.action";
import {selectGetTasks, selectToggleAddTask, selectToggleEditTask} from "../../redux/task/task.selector";
import {createStructuredSelector} from "reselect";

const AddTask = ({ currentUser, projectDetails : { project }, dispatch}) => {

    const {hidden : isEditTaskHidden, index} = useSelector(selectToggleEditTask);
    const toggleAddTaskSelector = useSelector(selectToggleAddTask);

    const [taskDetail, setTaskDetail] = useState('');

    const addTask = async () => {
        dispatch(addTaskStartAsync(currentUser.id, project.id, taskDetail));
        setTaskDetail('');
        dispatch(toggleAddTask());
    };

    const toggleAddDetailBtn = () => {
        if( !isEditTaskHidden ) {
            dispatch(toggleEditTask(index))
        }
        dispatch(toggleAddTask());
    };

    return (
        <Fragment>
            <div className="content add-task" style={{'display': !toggleAddTaskSelector ? 'block':'none'}}>
                <a onClick={toggleAddDetailBtn}><span className='icon add-task-icon'><i className="fas fa-plus"></i></span> Add Task</a>
            </div>
            <div className="content add-task-detail" style={{'display': toggleAddTaskSelector ? 'block':'none'}}>
                <input className="input" type="text" placeholder="Task Detail" value={taskDetail} onChange={(e) => setTaskDetail(e.target.value)}/>
                <div className="add-task-action">
                <div className="buttons">
                <button className="button is-primary" onClick={addTask}>Add Task</button>
                    <button className="button" onClick={() => dispatch(toggleAddTask())}>Cancel</button>
                    </div>
                </div>
            </div>
        </Fragment>
    )
};

const mapStateToProps = createStructuredSelector({
    currentUser : selectCurrentUser,
    projectDetails : selectGetTasks
});
export default connect(mapStateToProps)(AddTask);
