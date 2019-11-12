import React, { useState } from 'react';

const AddProjectModal = ({addProject, toggleModal, isActive}) => {

    const [projectName, setProjectName] = useState('');

    return (
        <div className={`${isActive ? 'is-active':''} modal`}>
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Add Project</p>
                    <button className="delete" aria-label="close" onClick={toggleModal}></button>
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
                    <button className="button" onClick={() => toggleModal()}>Close</button>
                </footer>
            </div>
        </div>
    )
}

export default AddProjectModal;
