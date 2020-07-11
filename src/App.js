import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from 'react-router-dom';

import 'materialize-css/dist/css/materialize.min.css';
import './App.css';

import HeaderComponent from "./components/header.component";
import ToDoListsRoute from "./routes/to-do-lists.route";
import CreateTodoListRoute from "./routes/create-todo-list.route";
import ClosedListsRoute from "./routes/closed-lists.route";

function App() {
	return (
		<div className="App">
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
		</div>
	);
}

export default App;
