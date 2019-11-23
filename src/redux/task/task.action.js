import { TaskActionTypes } from "./task.types";
import {firestore} from "../../firebase/firebase.util";

export const fetchTaskByProjectStart = () => ({
    type: TaskActionTypes.FETCH_TASKS_BY_PROJECT_START
});

export const fetchTaskByProjectFailure = (errorMessage) => ({
    type: TaskActionTypes.FETCH_TASKS_BY_PROJECT_FAILURE,
    payload: errorMessage
});

export const toggleAddTask = () => ({
    type: TaskActionTypes.TOGGLE_ADD_TASK
});

export const toggleEditTask = (index) => ({
    type: TaskActionTypes.TOGGLE_EDIT_TASK,
    payload: index
});

export const addTaskStartAsync = (userId, projectId, taskDetail) => {
    return async (dispatch) => {
        try {
            await firestore.collection('tasks').add({
                detail: taskDetail,
                isCompleted: 0,
                projectId: projectId,
                userId: userId,
                createdAt: new Date()
            })
        } catch (e) {
            console.log("Error while adding Task");
        }
    }
};

export const deleteTaskStartAsync = (id) => {
    return async (dispatch) => {
        try {
            await firestore.collection('tasks').doc(id).delete();
        } catch (e) {
            console.log("Error while deleting Task")
        }
    }
};

export const updateTaskStartAsync = (taskId, task) => {
    return async (dispatch) => {
        try {
            await firestore.collection('tasks').doc(taskId)
                .update(task);
        } catch (e) {
            console.log("Error while update Task");
        }
    }
};

export const fetchTasksByProject = (project) => {
    return (dispatch) => {
        dispatch(fetchTaskByProjectStart())
        firestore.collection('tasks')
            .where("projectId", "==", project.id)
            .orderBy("isCompleted", "asc")
            .onSnapshot(querySnapshot => {
            let tasks = [];
            querySnapshot.forEach(function(doc) {
                tasks.push({...doc.data(), id: doc.id});
            });
            dispatch({type: TaskActionTypes.FETCH_TASKS_BY_PROJECT_SUCCESS, payload: { project, tasks} })
        }, onError => {
            dispatch(fetchTaskByProjectFailure(onError.message));
        })
    }
};
