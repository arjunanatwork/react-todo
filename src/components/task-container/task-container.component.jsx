import React, { useState , Fragment} from 'react';
import connect from "react-redux";
import './task-container.styles.scss';
import {createStructuredSelector} from "reselect";

const TaskContainer = () => {

    const [toggleAddDetailBtn, setToggleAddDetailBtn] = useState(false);

    return (
        <Fragment>
            <p className="title is-4">Test Project</p>
            <div className="content add-task" style={{'display': !toggleAddDetailBtn ? 'block':'none'}}>
                <a onClick={() => setToggleAddDetailBtn(true)}><span className='icon add-task-icon'><i className="fas fa-plus"></i></span> Add Task</a>
            </div>
            <div className="content add-task-detail" style={{'display': toggleAddDetailBtn ? 'block':'none'}}>
                <input className="input" type="text" placeholder="Task Detail"/>
                <div className="add-task-action">
                    <div className="buttons">
                        <button className="button is-primary">Add Task</button>
                        <button className="button" onClick={() => setToggleAddDetailBtn(false)}>Cancel</button>
                    </div>
                </div>
            </div>
        </Fragment>
    )
};

const mapStateToProps = createStructuredSelector({

});
export default TaskContainer;
