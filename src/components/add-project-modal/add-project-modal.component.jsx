import React, { useState } from 'react';
import {connect} from "react-redux";
import {selectAddProjectModalHidden} from "../../redux/project/project.selector";
import {createStructuredSelector} from "reselect";
import {addProjectStartAsync, toggleAddProjectModalHidden} from "../../redux/project/project.action";
import {selectCurrentUser} from "../../redux/user/user.selector";

const AddProjectModal = ({isActive, currentUser, dispatch}) => {

    const [projectName, setProjectName] = useState('');

    const addProject = async (projectName) => {
        await dispatch(addProjectStartAsync(currentUser.id , projectName))
        setProjectName('')
        dispatch(toggleAddProjectModalHidden())
    }

    return (
        <div className={`${!isActive ? 'is-active':''} modal`}>
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Add Project</p>
                    <button className="delete" aria-label="close" onClick={() => dispatch(toggleAddProjectModalHidden())}></button>
                </header>
                <section className="modal-card-body">
                    <div className="field">
                        <label className="label">Project Name</label>
                        <div className="control">
                            <input className="input" type="text" placeholder="Text input" 
                                   value={projectName} onChange={(e)=> setProjectName(e.target.value)}/>
                        </div>
                    </div>
                </section>
                <footer className="modal-card-foot">
                    <button className="button is-primary" onClick={() => addProject(projectName)}>Add</button>
                    <button className="button" onClick={() => dispatch(toggleAddProjectModalHidden())}>Close</button>
                </footer>
            </div>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    isActive: selectAddProjectModalHidden,
    currentUser : selectCurrentUser
});

export default connect(mapStateToProps)(AddProjectModal);
