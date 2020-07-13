import React, {Component} from 'react';
import {connect} from 'react-redux'
import {checkTask, updateListStatus} from "../store/action";
import ButtonComponent from "../components/buttons/button.component";
import ToDoListStatus from "../utils/to-do-list-status";
import ViewToDoListCardUi from "../ui/view-to-do-list-card.ui";
import FlatButtonComponent from "../components/buttons/flat-button.component";

class ToDoListsRoute extends Component {
	toggleCheckTask = (listId, taskId) => {
		const {toggleCheck} = this.props;
		toggleCheck(listId, taskId);
	};

	completeList = (listId) => {
		const {updateListStatus} = this.props;
		updateListStatus(listId, ToDoListStatus.CLOSED);
	};

	renderActions = (listId) => {
		return (
			<div className="row text-right">
				<FlatButtonComponent
					clickMethod={() => this.completeList(listId)}
					buttonText="Complete List"
				/>
				<span className="white-text"> __ </span>
				<ButtonComponent
					clickMethod={() => null}
					buttonText="Edit List"
				/>
			</div>
		)
	};

	render() {
		const {toDoLists} = this.props;
		const filteredToDos = toDoLists
			.filter(list => (list.listStatus === ToDoListStatus.OPEN));
		return (
			<ViewToDoListCardUi
				toDoLists={filteredToDos}
				closeList={this.completeList}
				toggleCheck={this.toggleCheckTask}
				renderActions={this.renderActions}
			/>
		);
	}
}

const mapStateToProps = (_state) => ({
	toDoLists: _state.toDoLists
});

const mapDispatchToProps = (_dispatch) => {
	return {
		toggleCheck: (listId, taskId) => {
			_dispatch(checkTask(listId, taskId));
		},
		updateListStatus: (listId, status) => {
			_dispatch(updateListStatus(listId, status))
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(ToDoListsRoute);
