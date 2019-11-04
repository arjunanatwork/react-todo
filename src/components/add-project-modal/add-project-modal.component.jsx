import React from 'react';

const AddProjectModal = ({onClose, isActive}) => {

    return (
        <div className={`${isActive ? 'is-active':''} modal`}>
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Add Project</p>
                    <button className="delete" aria-label="close" onClick={onClose}></button>
                </header>
                <section className="modal-card-body">
                   Add Project
                </section>
                <footer className="modal-card-foot">
                    <button className="button is-primary">Save changes</button>
                    <button className="button" onClick={onClose}>Cancel</button>
                </footer>
            </div>
        </div>
    )
}

export default AddProjectModal;
