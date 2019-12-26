import React from 'react';
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import Loader from "react-loader-spinner";

import {selectGetProjects} from "../../redux/project/project.selector";
import {selectCurrentUser} from "../../redux/user/user.selector";
import ProjectItem from "../project-items/project-items.component";
import DefaultMenuItems from "../default-menu-items/default-menu-items.components";

import './header-menu-styles.scss';
import AddProjectSidebar from "../add-project-sidebar/add-project-sidebar.component";
import Settings from "../settings/settings.component";

const HeaderMenu = ({projects, toggleBurgerMenu}) => {

    return (
        <div id="navbarMenu" className={`navbar-menu is-hidden-desktop ${toggleBurgerMenu ? 'is-active':''}`}>
            <div className="navbar-start">
                <DefaultMenuItems />
                <div className="navbar-item has-dropdown">
                    <div className="navbar-link">
                        <strong>Projects</strong>
                    </div>
                    <div className="navbar-dropdown is-paddingless">
                        <ul className="menu-list">
                        {
                            projects ?
                                projects.map(project => ( <ProjectItem key={project.id}  project={project}/>))
                                :
                                (<div style={{textAlign:'center'}}><Loader type="Puff" color="#e44232"  height={20} width={20}/></div>)
                        }
                        </ul>
                        <div className="content add-project-blk">
                            <AddProjectSidebar/>
                        </div>
                    </div>
                </div>
                <div className="navbar-item has-dropdown">
                    <div className="navbar-link">
                        <strong>Settings</strong>
                    </div>
                    <div className="navbar-dropdown is-paddingless">
                        <Settings/>
                    </div>
                </div>
            </div>
        </div>
    );
};
const mapStateToProps = createStructuredSelector({
    projects: selectGetProjects,
    currentUser : selectCurrentUser
});
export default connect(mapStateToProps)(HeaderMenu);
