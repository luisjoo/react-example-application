import toDoListsReducer from './reducer'
import {createStore, combineReducers} from 'redux';

const rootReducer = combineReducers({
	toDoLists: toDoListsReducer
});

const store = createStore(rootReducer);

export default store;
