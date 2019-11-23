import React from 'react';
import './task-container.styles.scss';
import AddTask from "../add-task/add-task.component";
import TaskItem from "../task-items/task-items.component";

const TaskContainer = ({project, tasks}) => {

    return (
        <div className='task-container'>
            <p className="title is-4">{project.name}</p>
            <div className="task-list">
                {
                    tasks.length > 0 ?
                        tasks.map((task, index) => (<TaskItem key={task.id} task={task} index={index}/>))
                        :
                        null
                }
            </div>
            <AddTask/>
        </div>
    )
};

export default TaskContainer;
