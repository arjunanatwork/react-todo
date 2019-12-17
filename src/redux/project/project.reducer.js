import { ProjectActionTypes } from "./project.types";

const INITIAL_STATE = {
    projects: null,
    addProjectModalHidden: true,
    editProjectModal: { editProjectModalHidden: true, project: null},
    isLoading: false,
    errorMessage: undefined
};

const ProjectReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case ProjectActionTypes.ADD_PROJECT_MODAL_HIDDEN:
            return {
                ...state,
                addProjectModalHidden: !state.addProjectModalHidden
            };
        case ProjectActionTypes.EDIT_PROJECT_MODAL:
            let { editProjectModalHidden, project } = state.editProjectModal;
            editProjectModalHidden = !editProjectModalHidden;
            project = action.payload;
            return {
                ...state,
                editProjectModal: { editProjectModalHidden , project }
            };
        case ProjectActionTypes.FETCH_PROJECT_START:
            return {
                ...state,
                isLoading: true
            };
        case ProjectActionTypes.FETCH_PROJECT_FAILURE:
            return {
                ...state,
                isLoading: false,
                errorMessage: action.payload
            };
        case ProjectActionTypes.FETCH_PROJECT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                projects: [...action.payload]
            };
        default:
            return state
    }
};

export default ProjectReducer;
