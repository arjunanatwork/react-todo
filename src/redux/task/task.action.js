import { TaskActionTypes } from "./task.types";
import { firestore} from "../../firebase/firebase.util";
import moment from 'moment';

import {toggleSwitchProjectDropdownHidden} from "../project/project.action";

export const fetchTasksStart = () => ({
    type: TaskActionTypes.FETCH_TASKS_START
});

export const fetchTasksFailure = (errorMessage) => ({
    type: TaskActionTypes.FETCH_TASKS_FAILURE,
    payload: errorMessage
});

export const toggleAddTask = () => ({
    type: TaskActionTypes.TOGGLE_ADD_TASK
});

export const toggleEditTask = (index) => ({
    type: TaskActionTypes.TOGGLE_EDIT_TASK,
    payload: index
});

export const changeProjectAsync = (taskId, projectId) => {
    return async (dispatch) => {
        try {
            await firestore.collection('tasks').doc(taskId)
                .update({ projectId: projectId});
            dispatch(toggleSwitchProjectDropdownHidden());
        } catch (e) {
            console.log("Error while moving Project");
        }
    }
};

export const addTaskStartAsync = (userId, projectId, taskDetail) => {
    return async (dispatch) => {
        try {
            await firestore.collection('tasks').add({
                detail: taskDetail,
                isCompleted: 0,
                projectId: projectId,
                userId: userId,
                scheduledOn: null,
                createdAt: new Date()
            })
        } catch (e) {
            console.error(e);
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


export const fetchTasksForDefaultProject = (userId) => {
    return (dispatch) => {
        dispatch(fetchTasksStart());
        const project = { id: 1, name: "Inbox"};
        firestore.collection('tasks')
            .where("userId", "==", userId)
            .where("projectId", "==", 1)
            .orderBy("isCompleted", "asc")
            .onSnapshot(querySnapshot => {
                let tasks = [];
                querySnapshot.forEach(function(doc) {
                    tasks.push({...doc.data(), id: doc.id});
                });
                tasks.sort((a, b) => {
                    if(a.isCompleted === 0 && b.isCompleted === 0)
                        return b.createdAt.toDate() - a.createdAt.toDate();
                });
                dispatch({type: TaskActionTypes.FETCH_TASKS_SUCCESS, payload: { project, tasks} })
            } , onError => {
                dispatch(fetchTasksFailure(onError.message));
            })
    }
};

export const fetchTasksForToday = (userId) => {
    return (dispatch) => {
        dispatch(fetchTasksStart());
        const project = { id: null, name: "Today"};
        const date =  moment().startOf('day').toDate();
        firestore.collection('tasks')
            .where("userId", "==",userId)
            .where("scheduledOn", "==", date)
            .where("isCompleted","==",0)
            .get().then(querySnapshot => {
                let tasks = [];
                querySnapshot.forEach(function(doc) {
                    tasks.push({...doc.data(), id: doc.id});
                });
                tasks.sort((a, b) => {
                    if(a.isCompleted === 0 && b.isCompleted === 0)
                        return b.createdAt.toDate() - a.createdAt.toDate();
                });
                dispatch({type: TaskActionTypes.FETCH_TASKS_SUCCESS, payload: { project, tasks} })
            } , onError => {
                dispatch(fetchTasksFailure(onError.message));
            })
    }
};

export const fetchTasksForAWeek = (userId) => {
    return (dispatch) => {
        dispatch(fetchTasksStart());
        const project = { id: null, name: "Next 7 Days"};
        const endDate =  moment().startOf('day').add(7, 'days').toDate();
        firestore.collection('tasks')
            .where("userId", "==",userId)
            .where("scheduledOn", "<=", endDate)
            .where("isCompleted","==",0)
            .get().then(querySnapshot => {
                let tasks = [];
                querySnapshot.forEach(function(doc) {
                    tasks.push({...doc.data(), id: doc.id});
                });
                tasks.sort((a, b) => {
                    if(a.isCompleted === 0 && b.isCompleted === 0)
                        return b.createdAt.toDate() - a.createdAt.toDate();
                });
                dispatch({type: TaskActionTypes.FETCH_TASKS_SUCCESS, payload: { project, tasks} })
            } , onError => {
                dispatch(fetchTasksFailure(onError.message));
            })
    }
};

export const fetchTasksByProject = (project) => {
    return (dispatch) => {
        dispatch(fetchTasksStart());
        firestore.collection('tasks')
            .where("projectId", "==", project.id)
            .orderBy("isCompleted", "asc")
            .onSnapshot(querySnapshot => {
            let tasks = [];
            querySnapshot.forEach(function(doc) {
                tasks.push({...doc.data(), id: doc.id});
            });
            tasks.sort((a, b) => {
                if(a.isCompleted === 0 && b.isCompleted === 0)
                    return b.createdAt.toDate() - a.createdAt.toDate();
            })
            dispatch({type: TaskActionTypes.FETCH_TASKS_SUCCESS, payload: { project, tasks} })
        }, onError => {
            dispatch(fetchTasksFailure(onError.message));
        })
    }
};
