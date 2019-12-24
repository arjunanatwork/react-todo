import React from 'react';
import {createStructuredSelector} from "reselect";
import {selectGetProjects} from "../../redux/project/project.selector";
import {selectCurrentUser} from "../../redux/user/user.selector";
import {connect} from "react-redux";
import ProjectItem from "../project-items/project-items.component";
import Loader from "react-loader-spinner";

import './header-menu-styles.scss';
import DefaultMenuItems from "../default-menu-items/default-menu-items.components";

const HeaderMenu = ({projects, burgerToggle}) => {

    return (
        <div id="navbarMenu" className={`navbar-menu is-hidden-desktop ${burgerToggle ? 'is-active':''}`}>
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