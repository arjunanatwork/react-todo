import { ProjectActionTypes } from "./project.types";
import {firestore} from "../../firebase/firebase.util";
import {fetchTasksForDefaultProject} from "../task/task.action";

export const toggleAddProjectModalHidden = () => ({
    type: ProjectActionTypes.ADD_PROJECT_MODAL_HIDDEN
});

export const editProjectModal = (project) => ({
    type:ProjectActionTypes.EDIT_PROJECT_MODAL,
    payload: project
});

export const fetchProjectStart = () => ({
    type: ProjectActionTypes.FETCH_PROJECT_START
});

export const fetchProjectFailure = (errorMessage) => ({
    type: ProjectActionTypes.FETCH_PROJECT_FAILURE,
    payload: errorMessage
});

export const toggleSwitchProjectDropdownHidden = () => ({
    type: ProjectActionTypes.SWITCH_PROJECT_DROPDOWN_HIDDEN
});

export const toggleBurgerMenuAction = () => ({
   type: ProjectActionTypes.TOGGLE_BURGER_MENU
});

export const addProjectStartAsync = (userId, projectName) => {
    return async (dispatch) => {
        try {
            await firestore.collection('projects').add({
                name: projectName,
                userId: userId,
                createdAt: new Date()
            })
        } catch (e) {
            console.log("Error while adding Project");
        }
    }
};

export const updateProjectStartAsync = (projectId, projectName) => {
    return async (dispatch) => {
        try {
            await firestore.collection('projects').doc(projectId)
                .update({ name: projectName });
        } catch (e) {
            console.log("Error while update Project");
        }
    }
};

export const deleteProjectStartAsync = (projectId, userId) => {
    return async (dispatch) => {
        try {
            await firestore.collection('tasks')
                .where("projectId", "==", projectId).get().then(
                    (querySnapshot) => {
                        if(!querySnapshot.empty) {
                            var batch = firestore.batch();
                            querySnapshot.forEach(function (doc) {
                                batch.delete(doc.ref);
                            });
                            batch.commit();
                        }
                    });
            await firestore.collection('projects').doc(projectId).delete();
            dispatch(fetchTasksForDefaultProject(userId));
        } catch (e) {
            console.log("Error while deleting Project")
        }
    }
};

export const fetchProjectsStartAsync = (userRef) => {
    return (dispatch) => {
        dispatch(fetchProjectStart());
        firestore.collection('projects').where("userId", "==", userRef.id).onSnapshot(querySnapshot => {
            let projects = [];
            querySnapshot.forEach(function(doc) {
                projects.push({...doc.data(), id: doc.id});
            });
            dispatch({type: ProjectActionTypes.FETCH_PROJECT_SUCCESS, payload: projects})
        }, onError => {
            dispatch(fetchProjectFailure(onError.message));
        })
    }
};


