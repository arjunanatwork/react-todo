import React, { useEffect, Fragment} from 'react';
import {connect, useDispatch} from "react-redux";
import {createStructuredSelector} from "reselect";
import Loader from "react-loader-spinner";

import {selectEditProjectModal} from "../../redux/project/project.selector";
import {selectGetTasks} from "../../redux/task/task.selector";
import {selectCurrentUser} from "../../redux/user/user.selector";

import Header from "../../components/header/header.component";
import TaskContainer from "../../components/task-container/task-container.component";
import SideBar from "../../components/sidebar/sidebar.component";
import AddProjectModal from "../../components/add-project-modal/add-project-modal.component";
import EditProjectModal from "../../components/edit-project-modal/edit-project-modal.component";
import {fetchTasksForDefaultProject} from "../../redux/task/task.action";

import './home.styles.scss';

const Home = ({currentUser, editProjectModal:{ editProjectModalHidden }, tasks}) => {

    const dispatch = useDispatch();

    useEffect(() => {
        if(currentUser)
            dispatch(fetchTasksForDefaultProject(currentUser.id))
    }, [currentUser]);

    return (
        <Fragment>
            <Header/>
            <section className="section">
                <div className="container">
                        <div className="sidebar is-hidden-touch">
                            <SideBar/>
                        </div>
                        <div className="main is-full-width-mobile">
                            <div className="columns is-marginless">
                                <div className="column is-full">
                                    { tasks.project ?
                                        <TaskContainer project={tasks.project} tasks={tasks.tasks}/>
                                        :
                                        (<div style={{textAlign:'center'}}><Loader type="Puff" color="#e44232"  height={20} width={20}/></div>)
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            <AddProjectModal/>
            { editProjectModalHidden ? null : (<EditProjectModal/>)}
        </Fragment>
    )
};

const mapStateToProps = createStructuredSelector({
    editProjectModal: selectEditProjectModal,
    tasks: selectGetTasks,
    currentUser: selectCurrentUser
});
export default connect(mapStateToProps)(Home);

