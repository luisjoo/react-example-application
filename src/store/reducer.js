import {ADD_TODO_LIST, CHECK_TASK_TODO_LIST, REMOVE_TODO_LIST, UPDATE_TASK_TODO_LIST} from './types'

const toDoLists = (state = [], action) => {
	switch (action.type) {
		case CHECK_TASK_TODO_LIST:
			return checkTaskToggle(state, action.data);
		case UPDATE_TASK_TODO_LIST:
			return updateToDoListStatus(state, action.data);
		case REMOVE_TODO_LIST:
			return deleteToDoList(state, action.data);
		case ADD_TODO_LIST:
			return addListToState(state, action.data);
		default:
			return state;
	}
};

const addListToState = (list, data) => {
	return [...list, data];
};

const deleteToDoList = (state, listId) => {
	return state.filter(list => list.listId !== listId)
};

const updateToDoListStatus = (lists, data) => {
	const {listId, status} = data;
	return lists.map(list => {
		if (list.listId === listId) {
			list.listStatus = status;
		}

		return list;
	})
};

const checkTaskToggle = (state, data) => {
	return state.map(list => {
		if (list.listId === data.listId) {
			list.taskList = toggleCheck(list.taskList, data.taskId);
		}

		return list;
	})
};

const toggleCheck = (taskList, taskId) => {
	return taskList.map(task => {
		if (task.taskId === taskId) {
			task.taskCompleted = !task.taskCompleted;
		}

		return task;
	})
};

export default toDoLists;
