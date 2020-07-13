import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import moment from "moment";
import CardComponent from "../components/card/card.component";
import ContainerComponent from "../components/utils/container.component";
import TaskListContainerComponent from "../components/tasks/task-list-container.component";

class ToDoListCardUi extends PureComponent {
	toggleCheckTask = (listId, taskId) => {
		const {toggleCheck} = this.props;
		toggleCheck(listId, taskId);
	};

	renderCard = () => {
		const {toDoLists, renderActions} = this.props;

		return toDoLists
			.map(list => (
				<CardComponent
					key={list.listId}
					cardActions={renderActions(list.listId)}
					cardContent={this.renderCardContent(list)}
					cardTitle={`To Do Name: ${list.listName}, Dues: ${moment(list.listDueDate).format('lll')}`}
				/>
			));
	};

	renderCardContent = (list) => {
		const {taskList, listId} = list;
		return (
			<TaskListContainerComponent
				taskList={taskList}
				disableCompletion={false}
				removeFromList={() => null}
				updateItemInList={() => null}
				hideTaskActionButtons
				completeTask={(taskId) => this.toggleCheckTask(listId, taskId)}
			/>
		)
	};

	render() {
		return (
			<ContainerComponent>
				<div className="col s12 m8 l6 offset-m2 offset-l3">
					{this.renderCard()}
				</div>
			</ContainerComponent>
		);
	}
}

ToDoListCardUi.propTypes = {
	closeList: PropTypes.func.isRequired,
	toDoLists: PropTypes.array.isRequired,
	toggleCheck: PropTypes.func.isRequired,
	renderActions: PropTypes.any.isRequired
};

export default ToDoListCardUi;
