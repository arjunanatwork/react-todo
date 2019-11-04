import React , { useState } from 'react';
import './sidebar.styles.scss';
import AddProjectModal from "../add-project-modal/add-project-modal.component";

const SideBar = () => {

    const [isActive, setIsActive] = useState(false);

    const showModal = () => {
        setIsActive(!isActive)
    }

    return (
        <div className="sidebar">
            <aside className="menu">
                <ul className="menu-list">
                    <li><a><span className="icon has-margin-right-5"><i className="fa fa-inbox"></i></span>Dashboard</a></li>
                    <li><a><span className="icon has-margin-right-5"><i className="fa fa-calendar-check"></i></span>Today</a></li>
                    <li><a><span className="icon has-margin-right-5"><i className="fa fa-calendar-alt"></i></span>Next 7 days</a></li>
                </ul>
                <p className="menu-label">
                    Projects
                </p>
                <ul className="menu-list">
                    {/* Projects will come here */}
                </ul>
                <div className="content">
                    <p onClick={showModal}><span className="icon has-margin-right-5"><i className="fa fa-plus"></i></span>Add Project</p>
                </div>
            </aside>
            <AddProjectModal onClose={showModal} isActive={isActive} />
        </div>
    )
}

export default SideBar;
