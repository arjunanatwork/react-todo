import { ProjectActionTypes } from "./project.types";
import {firestore} from "../../firebase/firebase.util";

export const toggleAddProjectModalHidden = () => ({
    type: ProjectActionTypes.ADD_PROJECT_MODAL_HIDDEN
});

export const editProjectModal = (project) => ({
    type:ProjectActionTypes.EDIT_PROJECT_MODAL,
    payload: project
});

export const projectStart = () => ({
    type: ProjectActionTypes.PROJECT_START
});

export const projectSuccess = () => ({
    type:ProjectActionTypes.PROJECT_SUCCESS
})

export const projectFailure = (errorMessage) => ({
    type: ProjectActionTypes.PROJECT_FAILURE,
    payload: errorMessage
});

export const addProjectStartAsync = (userId, projectName) => {
    return async (dispatch) => {
        try {
            dispatch(projectStart())
            await firestore.collection('projects').add({
                name: projectName,
                userId: userId,
                createdAt: new Date()
            })
            dispatch(projectSuccess())
        } catch (e) {
            dispatch(projectFailure(e.message))
        }
    }
};

export const updateProjectStartAsync = (projectId, projectName) => {
    return async (dispatch) => {
        try {
            dispatch(projectStart())
            await firestore.collection('projects').doc(projectId)
                .update({ name: projectName });
            dispatch(projectSuccess())
        } catch (e) {
            dispatch(projectFailure(e.message))
        }
    }
}

export const deleteProjectStartAsync = (id) => {
    return async (dispatch) => {
        try {
            dispatch(projectStart())
            await firestore.collection('projects').doc(id).delete();
            dispatch(projectSuccess())
        } catch (e) {
            dispatch(projectFailure(e.message))
        }
    }
};

export const fetchProjectsStartAsync = (userRef) => {
    return (dispatch) => {
        firestore.collection('projects').where("userId", "==", userRef.id).onSnapshot(querySnapshot => {
            let projects = [];
            querySnapshot.forEach(function(doc) {
                projects.push({...doc.data(), id: doc.id});
            });
            dispatch({
                type: ProjectActionTypes.FETCH_PROJECT,
                payload: projects
            })
        })
    }
}
