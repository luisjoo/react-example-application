import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';

import 'materialize-css/dist/css/materialize.min.css';
import './App.css';

import HeaderComponent from "./components/header/header.component";
import ToDoListsRoute from "./routes/to-do-lists.route";
import CreateTodoListRoute from "./routes/create-todo-list.route";
import ClosedListsRoute from "./routes/closed-lists.route";
import store from './store'

function App() {
	return (
		<div className="App">
			<Provider store={store}>
				<Router>
					<HeaderComponent/>
					<Switch>
						<Route path="/create-to-do-list">
							<CreateTodoListRoute/>
						</Route>
						<Route path="/closed-lists">
							<ClosedListsRoute/>
						</Route>
						<Route path="/">
							<ToDoListsRoute/>
						</Route>
					</Switch>
				</Router>
			</Provider>
		</div>
	);
}

export default App;
