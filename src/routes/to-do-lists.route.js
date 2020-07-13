import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux'
import CardComponent from "../components/card/card.component";
import moment from 'moment';
import ContainerComponent from "../components/utils/container.component";
import TaskListContainerComponent from "../components/tasks/task-list-container.component";
import RowComponent from "../components/utils/row.component";
import ButtonComponent from "../components/buttons/button.component";
import {checkTask, closeList} from "../store/action";
import ToDoListStatus from "../utils/to-do-list-status";

class ToDoListsRoute extends Component {
	toggleCheckTask = (listId, taskId) => {
		const {toggleCheck} = this.props;
		toggleCheck(listId, taskId);
	};

	completeList = (listId) => {
		const {closeList} = this.props;
		closeList(listId)
	};

	renderCard = () => {
		const {toDoLists} = this.props;

		return toDoLists
			.filter(list => (list.listStatus === ToDoListStatus.OPEN))
			.map(list => (
				<CardComponent
					key={list.listId}
					cardTitle={`${list.listName} Due date: ${moment(list.listDueDate).format('lll')}`}
					cardActions={this.renderActions(list.listId)}
					cardContent={this.renderCardContent(list)}
				/>
			));
	};

	renderActions = (listId) => {
		return (
			<RowComponent>
				<ButtonComponent
					clickMethod={() => this.completeList(listId)}
					buttonText="Complete List"
				/>
				<span className="white-text"> __ </span>
				<ButtonComponent
					clickMethod={() => null}
					buttonText="Edit List"
				/>
			</RowComponent>
		)
	};

	renderCardContent = (list) => {
		const {taskList, listId} = list;
		return (
			<Fragment>
				<RowComponent>

				</RowComponent>
				<TaskListContainerComponent
					taskList={taskList}
					disableCompletion={false}
					removeFromList={() => null}
					updateItemInList={() => null}
					hideTaskActionButtons
					completeTask={(taskId) => this.toggleCheckTask(listId, taskId)}
				/>
			</Fragment>
		)
	};

	render() {
		console.log('ttt', this.props);
		return (
			<ContainerComponent>
				{this.renderCard()}
			</ContainerComponent>

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
		closeList: (listId) => {
			_dispatch(closeList(listId))
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(ToDoListsRoute);
