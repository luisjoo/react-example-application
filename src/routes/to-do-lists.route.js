import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux'
import CardComponent from "../components/card/card.component";
import moment from 'moment';
import ContainerComponent from "../components/utils/container.component";
import TaskListContainerComponent from "../components/tasks/task-list-container.component";
import RowComponent from "../components/utils/row.component";
import ButtonComponent from "../components/buttons/button.component";

class ToDoListsRoute extends Component {
	renderCard = () => {
		const {toDoLists} = this.props;

		return toDoLists.map(list => (
			<CardComponent
				key={list.listId}
				cardTitle={list.listName}
				cardActions={this.renderActions()}
				cardContent={this.renderCardContent(list)}
			/>
		));
	};

	renderActions = () => {
		return (
			<RowComponent>
				<ButtonComponent
					clickMethod={() => null}
					buttonText="Close List"
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
		const {taskList, listDueDate} = list;
		return (
			<Fragment>
				<RowComponent>
					<span>Due date: {moment(listDueDate).format('lll')}</span>
				</RowComponent>
				<TaskListContainerComponent
					taskList={taskList}
					disableCompletion={false}
					completeTask={() => null}
					removeFromList={() => null}
					updateItemInList={() => null}
					hideTaskActionButtons
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

export default connect(mapStateToProps)(ToDoListsRoute);
