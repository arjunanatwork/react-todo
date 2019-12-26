import React, {Fragment, useEffect} from 'react';
import {connect, useDispatch} from "react-redux";
import Loader from 'react-loader-spinner';
import {createStructuredSelector} from "reselect";

import {selectGetProjects} from "../../redux/project/project.selector";
import {selectCurrentUser} from "../../redux/user/user.selector";
import ProjectItem from "../project-items/project-items.component";
import {fetchProjectsStartAsync} from "../../redux/project/project.action";
import DefaultMenuItems from "../default-menu-items/default-menu-items.components";
import AddProjectSidebar from "../add-project-sidebar/add-project-sidebar.component";

import './sidebar.styles.scss';
import Settings from "../settings/settings.component";

const SideBar = ({projects, currentUser}) => {

    const dispatch = useDispatch();

    useEffect(() => {
        if(currentUser)
            dispatch(fetchProjectsStartAsync(currentUser))
    }, [currentUser]);

    return (
            <aside className="menu">
                <DefaultMenuItems />
                <p className="menu-label">
                    Projects
                </p>
                <ul className="menu-list">
                    {/* Projects will come here */}
                    {
                        projects ?
                            projects.map(project => (<ProjectItem key={project.id}  project={project}/>))
                                :
                            (<div style={{textAlign:'center'}}><Loader type="Puff" color="#e44232"  height={20} width={20}/></div>)
                    }
                </ul>
                <div className="content add-project-blk">
                    <AddProjectSidebar/>
                </div>
                <p className="menu-label">
                    Settings
                </p>
                <Settings/>
            </aside>
    )
};

const mapStateToProps = createStructuredSelector({
    projects: selectGetProjects,
    currentUser : selectCurrentUser
});
export default connect(mapStateToProps)(SideBar);
