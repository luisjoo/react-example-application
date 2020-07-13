import {ADD_TODO_LIST, CHECK_TASK_TODO_LIST, UPDATE_TASK_TODO_LIST, REMOVE_TODO_LIST} from "./types";

export const addToDoList = (toDoList) => ({
	type: ADD_TODO_LIST,
	data: toDoList,
});

export const removeToDoList = (listId) => ({
	type: REMOVE_TODO_LIST,
	data: listId,
});

export const checkTask = (listId, taskId) => ({
	type: CHECK_TASK_TODO_LIST,
	data: {
		listId,
		taskId,
	}
});

export const updateListStatus = (listId, status) => ({
	type: UPDATE_TASK_TODO_LIST,
	data: {
		listId,
		status
	}
});
