import { createSelector } from 'reselect';

const selectProject = state => state.project;

export const selectAddProjectModalHidden = createSelector(
    [selectProject],
    (project) => project.addProjectModalHidden
);

export const selectEditProjectModal = createSelector(
    [selectProject],
    (project) => project.editProjectModal
);

export const selectGetProjects = createSelector(
    [selectProject],
    (project) => project.projects
);
