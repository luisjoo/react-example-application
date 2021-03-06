import React, {Component} from 'react';
import {connect} from 'react-redux'
import {checkTask, updateListStatus} from "../store/action";
import ButtonComponent from "../components/buttons/button.component";
import ToDoListStatus from "../utils/to-do-list-status";
import ViewToDoListCardUi from "../ui/view-to-do-list-card.ui";
import FlatButtonComponent from "../components/buttons/flat-button.component";
import {withRouter} from 'react-router-dom';
import Toast from "../utils/toast";

class ToDoListsRoute extends Component {
	toggleCheckTask = (listId, taskId) => {
		const {toggleCheck} = this.props;
		toggleCheck(listId, taskId);
	};

	completeList = (listId) => {
		const {updateListStatus} = this.props;
		Toast.info('List was moved to \'Closed List\'');
		updateListStatus(listId, ToDoListStatus.CLOSED);
	};

	updateToDoList = (listId) => {
		const {history, } = this.props;
		// console.log(history, listId);
		history.push(`/edit-to-do-list/${listId}`)
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
					clickMethod={() => this.updateToDoList(listId)}
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

const withRouterComponent = withRouter(ToDoListsRoute);
export default connect(mapStateToProps, mapDispatchToProps)(withRouterComponent);
