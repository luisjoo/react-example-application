import {ADD_TODO_LIST, CHECK_TASK_TODO_LIST, REMOVE_TODO_LIST} from "./types";

export const addToDoList = (toDoList) => {
	return {
		type: ADD_TODO_LIST,
		data: toDoList,
	}
};

export const removeToDoList = (listId, taskId) => {
	return {
		type: REMOVE_TODO_LIST,
		data: listId,
	}
};

export const checkTask = (listId, taskId) => {
	return {
		type: CHECK_TASK_TODO_LIST,
		data: {
			listId,
			taskId,
		}
	}
};
