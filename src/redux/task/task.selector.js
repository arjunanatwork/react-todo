import { createSelector } from 'reselect';

const selectTask = state => state.task;

export const selectGetTasksByProject = createSelector(
    [selectTask],
    (task) => task.tasksByProject
);

export const selectToggleEditTask = createSelector(
    [selectTask],
    (task) => task.toggleEditTask
);

export const selectToggleAddTask = createSelector(
    [selectTask],
    (task) => task.toggleAddTask
);
