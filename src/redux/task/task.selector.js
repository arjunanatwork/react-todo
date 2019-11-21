import { createSelector } from 'reselect';

const selectTask = state => state.task;

export const selectGetTasksByProject = createSelector(
    [selectTask],
    (task) => task.tasksByProject
);
