import React, {useState} from 'react';
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {selectEditProjectModal} from "../../redux/project/project.selector";
import {updateProjectStartAsync, editProjectModal } from "../../redux/project/project.action";
import {selectCurrentUser} from "../../redux/user/user.selector";

const EditProjectModal = ({ editProjectModal:{ editProjectModalHidden, project }, dispatch }) => {
    const [projectName, setProjectName] = useState('');

    const updateProject = async (projectName) => {
        dispatch(updateProjectStartAsync(project.id, projectName));
        setProjectName('');
        dispatch(editProjectModal(null));
    }

    return (
        <div className={`${!editProjectModalHidden ? 'is-active':''} modal`}>
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Edit Project</p>
                    <button className="delete" aria-label="close" onClick={() => dispatch(editProjectModal(null))}></button>
                </header>
                <section className="modal-card-body">
                    <div className="field">
                        <label className="label">Project Name</label>
                        <div className="control">
                            <input className="input" type="text" placeholder="Text input"
                                   defaultValue={project ? project.name : ''} onChange={(e)=> setProjectName(e.target.value)}/>
                        </div>
                    </div>
                </section>
                <footer className="modal-card-foot">
                    <button className="button is-primary" onClick={() => updateProject(projectName)}>Update</button>
                    <button className="button" onClick={() => dispatch(editProjectModal(null))}>Close</button>
                </footer>
            </div>
        </div>
    )
};

const mapStateToProps = createStructuredSelector({
    editProjectModal: selectEditProjectModal
});
export default connect(mapStateToProps)(EditProjectModal);
