import React from 'react';

import TaskItem from "../task-items/task-items.component";
import AddTask from "../add-task/add-task.component";

import './task-container.styles.scss';

const TaskContainer = ({project, tasks}) => {

    return (
        <div className='task-container'>
            <p className="title is-4"> {project.name} </p>
            <div className="task-list">
                {
                    tasks.length > 0 ?
                        tasks.map((task, index) => (<TaskItem key={task.id} task={task} index={index}/>)) : null
                }
            </div>
            {project.id ?  <AddTask/> : null }
        </div>
    )
};

export default TaskContainer;
