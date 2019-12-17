import { createSelector } from 'reselect';

const selectTask = state => state.task;

export const selectGetTasks = createSelector(
    [selectTask],
    (task) => task.tasks
);

export const selectToggleEditTask = createSelector(
    [selectTask],
    (task) => task.toggleEditTask
);

export const selectToggleAddTask = createSelector(
    [selectTask],
    (task) => task.toggleAddTask
);
