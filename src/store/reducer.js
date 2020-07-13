import {CHECK_TASK_TODO_LIST, REMOVE_TODO_LIST, ADD_TODO_LIST} from './types'

const toDoLists = (state = [], action) => {
	switch (action.type) {
		case CHECK_TASK_TODO_LIST:
			return state;
		case REMOVE_TODO_LIST:
			return state;
		case ADD_TODO_LIST:
			return addListToState(state, action.data);
		default:
			return state;
	}
};

const addListToState = (list, data) => {
	return [...list, data];
};

export default toDoLists;
