import React from 'react';
import './project-items.styles.scss';

import {useDispatch} from "react-redux";
import {deleteProjectStartAsync, editProjectModal} from "../../redux/project/project.action";
import {fetchTasksByProject} from "../../redux/task/task.action";

const ProjectItem = ({project}) => {

    const dispatch = useDispatch()

    const deleteProject = () => {
        dispatch(deleteProjectStartAsync(project.id))
    };

    const editProject = () => {
        dispatch(editProjectModal(project));
    };

    const fetchTasks = (projectId) => {
      dispatch(fetchTasksByProject(projectId))
    };

    return (
        <li className="prj-item" onClick={fetchTasks(project.id)}>
            <a> {project.name}
                <span className="icon prj-icon-delete" onClick={deleteProject}>
                    <i className="fas fa-trash"></i>
                </span>
                <span className="icon prj-icon-edit" onClick={editProject}>
                    <i className="fas fa-edit"></i>
                </span>
            </a>
        </li>
    )
}

export default ProjectItem
