import React, {Component, Fragment} from 'react';
import RowComponent from "../components/utils/row.component";
import FlatButtonComponent from "../components/buttons/flat-button.component";
import ButtonComponent from "../components/buttons/button.component";
import InputComponent from "../components/input/input.component";
import CardComponent from "../components/card/card.component";
import IconInputComponent from "../components/input/icon-input.component";
import TaskListContainerComponent from "../components/tasks/task-list-container.component";
import Moment from 'moment';
import Constants from "../utils/Contants";

class CreateTodoListRoute extends Component {

	constructor(props) {
		super(props);

		this.refTask = React.createRef();
		this.state = this.getInitialState();
	}

	getInitialState = () => ({
		listName: '',
		taskList: [],
		taskName: '',
		listDueDate: this.initDueDate(),
		disableCompletion: true,

		// update task
		isEdit: false,
		selectedId: null,
	});


	initDueDate = () => Moment()
		.add(1, 'days')
		.format(Constants.DATE_FORMAT);

	onInputChange = (inputName) => {
		return ({target}) => {
			this.setState({[inputName]: target.value});
		}
	};

	createTask = (event) => {
		event.preventDefault();
		if (event.which !== 13) return;

		const {taskName, taskList} = this.state;
		const listCopy = [...taskList];
		const obj = {
			taskName,
			taskId: new Date().getTime(),
			taskCompleted: false,
		};
		listCopy.push(obj);
		this.setState({taskList: listCopy, taskName: ''});
	};

	removeTaskFromList = (taskId) => {
		const {taskList} = this.state;
		const filteredList = taskList.filter(item => item.taskId !== taskId);
		this.setState({taskList: filteredList});
	};

	updateTask = (taskId) => {
		const {taskList} = this.state;
		const task = taskList.find(item => item.taskId === taskId);

		this.refTask.current.focus();
		this.setState({
			isEdit: true,
			selectedId: taskId,
			taskName: task.taskName
		});
	};

	completeTask = (id, value) => {
		const {taskList} = this.state;
		const newList = taskList.map((task) => {
			if (task.taskId === id) {
				return {...task, taskCompleted: value}
			}
			return task;
		});

		this.setState({taskList: newList});
	};

	isDisabled = () => {
		const {listName, taskList, listDueDate} = this.state;

		const hasListName = (!listName && listName === '');
		const hasDueDate = (!listDueDate && listDueDate === '');
		const hasItemsInList = (taskList && taskList.length === 0);

		return (hasDueDate || hasListName || hasItemsInList);
	};

	renderTaskCreationUpdateInput = () => {
		const {taskName, isEdit} = this.state;
		const inputIcon = !isEdit ? 'add' : 'edit';
		return (
			<RowComponent>
				<IconInputComponent
					value={taskName}
					iconName={inputIcon}
					labelName="Task Name"
					inputId="addTaskToList"
					onKeyUp={this.createTask}
					taskReference={this.refTask}
					onChange={this.onInputChange('taskName')}
				/>
			</RowComponent>
		);
	};

	renderCardContent = () => {
		const {listName, listDueDate, taskList, disableCompletion} = this.state;

		return (
			<form>
				<RowComponent>
					<InputComponent
						inputType="text"
						elementId="listName"
						labelText="List Name"
						value={listName}
						onChange={this.onInputChange('listName')}
					/>
				</RowComponent>
				<RowComponent>
					<InputComponent
						inputType="date"
						elementId="listDueDate"
						labelText="Due date"
						value={listDueDate}
						onChange={this.onInputChange('listDueDate')}
					/>
				</RowComponent>

				{this.renderTaskCreationUpdateInput()}

				<TaskListContainerComponent
					taskList={taskList}
					completeTask={this.completeTask}
					updateItemInList={this.updateTask}
					disableCompletion={disableCompletion}
					removeFromList={this.removeTaskFromList}
				/>
			</form>
		);
	};

	renderActionButtons = () => {
		return (
			<Fragment>
				<FlatButtonComponent
					clickMethod={() => {
					}}
					buttonText="Clear Fields"
				/>
				<ButtonComponent
					clickMethod={() => null}
					buttonText="Save List"
					disabled={this.isDisabled()}
				/>
			</Fragment>
		)
	};

	render() {
		return (
			<RowComponent>
				<CardComponent
					cardTitle="Create New Task List"
					cardContent={this.renderCardContent()}
					cardActions={this.renderActionButtons()}
				/>
			</RowComponent>
		)
	}
}

export default CreateTodoListRoute;
