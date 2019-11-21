import { TaskActionTypes } from "./task.types";
import {firestore} from "../../firebase/firebase.util";

export const taskStart = () => ({
    type: TaskActionTypes.TASK_START
});

export const taskSuccess = () => ({
    type: TaskActionTypes.TASK_SUCCESS
});

export const taskFailure = (errorMessage) => ({
    type: TaskActionTypes.TASK_FAILURE,
    payload: errorMessage
});

export const fetchTasksByProject = (projectId) => {
    return (dispatch) => {
        firestore.collection('tasks').where("projectId", "==", projectId)
            .onSnapshot(querySnapshot => {
            let tasks = [];
            querySnapshot.forEach(function(doc) {
                tasks.push({...doc.data(), id: doc.id});
            });
            dispatch({
                type: TaskActionTypes.FETCH_TASKS_BY_PROJECT,
                payload: tasks
            })
        })
    }
};
