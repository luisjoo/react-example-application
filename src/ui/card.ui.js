import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import CardComponent from "../components/card/card.component";
import RowComponent from "../components/utils/row.component";
import InputComponent from "../components/input/input.component";
import TaskListContainerComponent from "../components/tasks/task-list-container.component";
import IconInputComponent from "../components/input/icon-input.component";

class CardUi extends PureComponent {
	renderTaskCreationUpdateInput = () => {
		const {taskName, isEdit, createTask, onInputChange, refTask} = this.props;
		const inputIcon = !isEdit ? 'add' : 'edit';
		return (
			<RowComponent>
				<IconInputComponent
					value={taskName}
					iconName={inputIcon}
					labelName="Task Name"
					inputId="addTaskToList"
					onKeyUp={createTask}
					taskReference={refTask}
					onChange={onInputChange('taskName')}
				/>
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
			<form>
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
			</form>
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
	removeTaskFromList: PropTypes.func.isRequired,

	refTask: PropTypes.any.isRequired,
	taskList: PropTypes.any.isRequired,
	renderActionButtons: PropTypes.any.isRequired,
};

export default CardUi;
