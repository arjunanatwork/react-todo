import React , { useEffect } from 'react';
import {connect} from "react-redux";
import './sidebar.styles.scss';
import { useDispatch } from "react-redux";
import { fetchProjectsStartAsync } from "../../redux/project/project.action";
import AddProjectSidebar from "../add-project-sidebar/add-project-sidebar.component";
import {createStructuredSelector} from "reselect";
import {selectGetProjects} from "../../redux/project/project.selector";
import {selectCurrentUser} from "../../redux/user/user.selector";
import ProjectItem from "../project-items/project-items.component";
import Loader from 'react-loader-spinner';
import {fetchTasksForAWeek, fetchTasksForDefaultProject, fetchTasksForToday} from "../../redux/task/task.action";

const SideBar = ({projects, currentUser}) => {

    const dispatch = useDispatch();

    useEffect(() => {
        if(currentUser)
            dispatch(fetchProjectsStartAsync(currentUser))
    }, [currentUser]);

    const fetchDefaultTasks = () => {
        dispatch(fetchTasksForDefaultProject(currentUser.id));
    };

    const fetchTodayTasks = () => {
        dispatch(fetchTasksForToday(currentUser.id));
    };

    const fetchWeekTasks = () => {
      dispatch(fetchTasksForAWeek(currentUser.id));
    };

    return (
            <aside className="menu">
                <ul className="menu-list">
                    <li onClick={fetchDefaultTasks}>
                        <a><span className="icon has-margin-right-5" style={{color:'#246fe0'}}><i className="fa fa-inbox"></i></span>Inbox</a>
                    </li>
                    <li onClick={fetchTodayTasks}>
                        <a><span className="icon has-margin-right-5" style={{color: '#058527'}}><i className="fa fa-calendar-check"></i></span>Today</a>
                    </li>
                    <li onClick={fetchWeekTasks}>
                        <a><span className="icon has-margin-right-5" style={{color: '#692fc2'}}><i className="fa fa-calendar-alt"></i></span>Next 7 days</a>
                    </li>
                </ul>
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
            </aside>
    )
};

const mapStateToProps = createStructuredSelector({
    projects: selectGetProjects,
    currentUser : selectCurrentUser
});
export default connect(mapStateToProps)(SideBar);
