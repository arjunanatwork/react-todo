import React , { useState } from 'react';
import './sidebar.styles.scss';
import AddProjectModal from "../add-project-modal/add-project-modal.component";
import { useSelector } from "react-redux";
import { createNewProjectForUser } from "../../firebase/firebase.util";

const SideBar = () => {

    const currentUser = useSelector(state => state.user.currentUser);
    const [isActive, setIsActive] = useState(false);

    const toggleModal = () => {
        setIsActive(!isActive)
    }

    const addProject = async (projectName) => {
        try {
            const projectRef = await createNewProjectForUser(currentUser.id, projectName);
            toggleModal();
        } catch (e) {
            console.log(e)
        }
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
                <div className="content add-project-blk">
                    <p onClick={toggleModal}><span className="icon has-margin-right-5"><i className="fa fa-plus"></i></span>Add Project</p>
                </div>
            </aside>
            <AddProjectModal addProject={addProject} toggleModal={toggleModal} isActive={isActive} />
        </div>
    )
}

export default SideBar;
