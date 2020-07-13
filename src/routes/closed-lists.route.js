import React, {Component} from 'react';
import {connect} from 'react-redux'
import {removeToDoList} from "../store/action";
import ButtonComponent from "../components/buttons/button.component";
import ToDoListStatus from "../utils/to-do-list-status";
import ViewToDoListCardUi from "../ui/view-to-do-list-card.ui";
import FlatButtonComponent from "../components/buttons/flat-button.component";

class ClosedListsRoute extends Component {
	deleteTask = (listId) => {
		const {removeToDoList} = this.props;
		removeToDoList(listId)
	};

	completeList = (listId) => {
		const {closeList} = this.props;
		closeList(listId)
	};

	renderActions = (listId) => {
		return (
			<div className="row text-right">
				<FlatButtonComponent
					clickMethod={() => this.deleteTask(listId)}
					buttonText="Delete List"
				/>
				<span className="white-text"> __ </span>
				<ButtonComponent
					clickMethod={() => null}
					buttonText="Reopen"
				/>
			</div>
		)
	};

	render() {
		const {toDoLists} = this.props;
		const filteredToDos = toDoLists
			.filter(list => (list.listStatus === ToDoListStatus.CLOSED));
		return (
			<ViewToDoListCardUi
				toDoLists={filteredToDos}
				closeList={this.completeList}
				toggleCheck={() => null}
				renderActions={this.renderActions}
				disableCompletion
			/>
		);
	}
}

const mapStateToProps = (_state) => ({
	toDoLists: _state.toDoLists
});

const mapDispatchToProps = (_dispatch) => {
	return {
		removeToDoList: (listId) => {
			_dispatch(removeToDoList(listId));
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(ClosedListsRoute);
