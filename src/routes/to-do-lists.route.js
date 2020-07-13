import React, {Component} from 'react';
import ContainerComponent from "../components/utils/container.component";
import {connect} from 'react-redux'

class ToDoListsRoute extends Component {
	render() {
		console.log('ttt', this.props);
		return (
			<ContainerComponent>
				<h1>all lists</h1>
			</ContainerComponent>
		)
	}
}

const mapStateToProps = (_state) => ({
	toDoLists: _state.toDoLists
});

export default connect(mapStateToProps)(ToDoListsRoute);
