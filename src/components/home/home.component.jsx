import React, {Fragment} from 'react';
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {selectEditProjectModal} from "../../redux/project/project.selector";
import Header from "../header/header.component";
import SideBar from "../sidebar/sidebar.component";

import './home.styles.scss';
import AddProjectModal from "../add-project-modal/add-project-modal.component";
import EditProjectModal from "../edit-project-modal/edit-project-modal.component";
import TaskContainer from "../task-container/task-container.component";
import {selectGetTasksByProject} from "../../redux/task/task.selector";

const Home = ({editProjectModal:{ editProjectModalHidden }, tasksByProject}) => {

    return (
        <Fragment>
            <Header/>
            <div className="section">
                <div className="container">
                    <div className="columns">
                        <div className="column is-2 is-offset-2 is-hidden-touch">
                            <SideBar/>
                        </div>
                        <div className="column is-5">
                            <div className="columns">
                                <div className="column is-full">
                                    { tasksByProject.project ?
                                        <TaskContainer project={tasksByProject.project} tasks={tasksByProject.tasks}/>
                                        :
                                        null
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <AddProjectModal/>
            { editProjectModalHidden ? null : (<EditProjectModal/>)}
        </Fragment>
    )
};

const mapStateToProps = createStructuredSelector({
    editProjectModal: selectEditProjectModal,
    tasksByProject: selectGetTasksByProject
});
export default connect(mapStateToProps)(Home);

