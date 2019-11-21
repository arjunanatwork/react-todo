import {TaskActionTypes} from "./task.types";

const INITIAL_STATE = {
    tasksByProject: null,
    isLoading: false,
    errorMessage: undefined
}

const TaskReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TaskActionTypes.TASK_START:
            return {
                ...state,
                isLoading: true
            };
        case TaskActionTypes.TASK_SUCCESS:
            return  {
                ...state,
                isLoading: false
            };
        case TaskActionTypes.TASK_FAILURE:
            return {
                ...state,
                errorMessage: action.payload
            };
        case TaskActionTypes.FETCH_TASKS_BY_PROJECT:
            return {
                ...state,
                tasksByProject: [...action.payload]
            }
        default:
            return state
    }
};

export default TaskReducer;
