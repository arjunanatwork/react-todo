import React , { useState, useEffect } from 'react';
import {connect} from "react-redux";
import './sidebar.styles.scss';
import { useDispatch, useSelector } from "react-redux";
import { addProjectStartAsync, fetchProjectsStartAsync } from "../../redux/project/project.action";
import AddProjectSidebar from "../add-project-sidebar/add-project-sidebar.component";
import {createStructuredSelector} from "reselect";
import {selectGetProjects} from "../../redux/project/project.selector";
import {selectCurrentUser} from "../../redux/user/user.selector";
import ProjectItem from "../project-items/project-items.component";

const SideBar = ({projects, currentUser}) => {

    const dispatch = useDispatch();

    useEffect(() => {
        if(currentUser)
            dispatch(fetchProjectsStartAsync(currentUser))
    }, [currentUser]);

    return (
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
                    {
                        projects ?
                            projects.map(project => (<ProjectItem key={project.id}  project={project}/>)) : null
                    }
                </ul>
                <div className="content add-project-blk">
                    <AddProjectSidebar/>
                </div>
            </aside>
    )
}
const mapStateToProps = createStructuredSelector({
    projects: selectGetProjects,
    currentUser : selectCurrentUser
})
export default connect(mapStateToProps)(SideBar);
