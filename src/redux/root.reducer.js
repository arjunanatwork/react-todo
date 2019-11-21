import { combineReducers } from "redux";
import userReducer from "./user/user.reducer";
import ProjectReducer from "./project/project.reducer";
import TaskReducer from "./task/task.reducer";

export default combineReducers({
    user: userReducer,
    project: ProjectReducer,
    tasks: TaskReducer
})
