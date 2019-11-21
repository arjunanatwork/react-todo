import React, {Fragment} from 'react';
import Header from "../header/header.component";
import SideBar from "../sidebar/sidebar.component";

import './home.styles.scss';
import AddProjectModal from "../add-project-modal/add-project-modal.component";
import EditProjectModal from "../edit-project-modal/edit-project-modal.component";
import TaskContainer from "../task-container/task-container.component";

const Home = () => {

    return (
        <Fragment>
            <Header/>
            <div className="section">
                <div className="container">
                    <div className="columns">
                        <div className="column is-one-fifth is-hidden-touch">
                            <SideBar/>
                        </div>
                        <div className="column">
                            <div className="columns">
                                <div className="column is-full">
                                    <TaskContainer/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <AddProjectModal/>
            <EditProjectModal/>
        </Fragment>
    )
}

export default Home;

