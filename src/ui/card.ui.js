import React, {Fragment, PureComponent} from 'react';
import PropTypes from 'prop-types';
import CardComponent from "../components/card/card.component";
import RowComponent from "../components/utils/row.component";
import InputComponent from "../components/input/input.component";
import TaskListContainerComponent from "../components/tasks/task-list-container.component";
import IconInputComponent from "../components/input/icon-input.component";
import FlatButtonComponent from "../components/buttons/flat-button.component";
import ButtonComponent from "../components/buttons/button.component";

class CardUi extends PureComponent {
	renderTaskUpdateButtons = () => {
		const {isEdit, saveUpdatedTask, cancelTaskUpdate} = this.props;
		if (!isEdit) return null;

		return (
			<Fragment>
				<div className="col s2 center-button">
					<FlatButtonComponent
						clickMethod={cancelTaskUpdate}
						buttonText="Cancel"
					/>
				</div>
				<div className="col s2 center-button">
					<ButtonComponent
						clickMethod={saveUpdatedTask}
						buttonText="Save"
					/>
				</div>
			</Fragment>
		);
	};

	renderAddNewTask = () => {
		const {isEdit, createTask} = this.props;
		if (isEdit) return null;

		return (
			<div className="col s2 center-button">
				<ButtonComponent
					clickMethod={createTask}
					buttonText="Add"
				/>
			</div>
		);
	};

	renderTaskCreationUpdateInput = () => {
		const {taskName, isEdit, createTask, onInputChange, refTask} = this.props;
		const inputIcon = !isEdit ? 'add' : 'edit';
		const containerClass = !isEdit ? 'col s10' : 'col s8';
		return (
			<RowComponent>
				<div className={containerClass}>
					<IconInputComponent
						value={taskName}
						iconName={inputIcon}
						labelName="Task Name"
						inputId="addTaskToList"
						taskReference={refTask}
						onChange={onInputChange('taskName')}
					/>
				</div>
				{this.renderTaskUpdateButtons()}
				{this.renderAddNewTask()}
			</RowComponent>
		);
	};

	renderCardContent = () => {
		const {
			listName, listDueDate, taskList, disableCompletion,
			completeTask, updateTask, removeTaskFromList,
			onInputChange
		} = this.props;

		return (
			<Fragment>
				<RowComponent>
					<InputComponent
						inputType="text"
						elementId="listName"
						labelText="List Name"
						value={listName}
						onChange={onInputChange('listName')}
					/>
				</RowComponent>
				<RowComponent>
					<InputComponent
						inputType="date"
						elementId="listDueDate"
						labelText="Due date"
						value={listDueDate}
						onChange={onInputChange('listDueDate')}
					/>
				</RowComponent>

				{this.renderTaskCreationUpdateInput()}

				<TaskListContainerComponent
					taskList={taskList}
					completeTask={completeTask}
					updateItemInList={updateTask}
					removeFromList={removeTaskFromList}
					disableCompletion={disableCompletion}
				/>
			</Fragment>
		);
	};

	render() {
		const {renderActionButtons, cardTitle} = this.props;

		return (
			<RowComponent>
				<CardComponent
					cardTitle={cardTitle}
					cardActions={renderActionButtons}
					cardContent={this.renderCardContent()}
				/>
			</RowComponent>
		);
	}
}

CardUi.propTypes = {
	taskName: PropTypes.string.isRequired,
	listName: PropTypes.string.isRequired,
	cardTitle: PropTypes.string.isRequired,
	listDueDate: PropTypes.string.isRequired,

	isEdit: PropTypes.bool.isRequired,
	disableCompletion: PropTypes.bool.isRequired,

	updateTask: PropTypes.func.isRequired,
	createTask: PropTypes.func.isRequired,
	completeTask: PropTypes.func.isRequired,
	onInputChange: PropTypes.func.isRequired,
	saveUpdatedTask: PropTypes.func.isRequired,
	cancelTaskUpdate: PropTypes.func.isRequired,
	removeTaskFromList: PropTypes.func.isRequired,

	refTask: PropTypes.any.isRequired,
	taskList: PropTypes.any.isRequired,
	renderActionButtons: PropTypes.any.isRequired,
};

export default CardUi;
