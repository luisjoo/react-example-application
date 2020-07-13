import React, {Component, Fragment} from 'react';
import RowComponent from "../components/utils/row.component";
import FlatButtonComponent from "../components/buttons/flat-button.component";
import ButtonComponent from "../components/buttons/button.component";
import InputComponent from "../components/input/input.component";
import IconInputComponent from "../components/input/icon-input.component";
import TaskListContainerComponent from "../components/tasks/task-list-container.component";
import Moment from 'moment';
import Constants from "../utils/Contants";
import CardUi from "../ui/card.ui";

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
		edition: false,
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

	createTask = () => {
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
			edition: true,
			selectedId: taskId,
			taskName: task.taskName
		});
	};

	cancelTaskUpdate = () => {
		this.setState({
			edition: false,
			selectedId: null,
			taskName: ''
		});
	};

	updateSelectedTask = () => {
		const {selectedId, taskName, taskList} = this.state;
		const updatedTaskList = taskList.map((task) => {
			if (task.taskId === selectedId) {
				task.taskName = taskName;
			}

			return task;
		});

		this.setState({
			taskName: '',
			edition: false,
			selectedId: null,
			taskList: updatedTaskList,
		});
	};

	isDisabled = () => {
		const {listName, taskList, listDueDate} = this.state;

		const hasListName = (!listName && listName === '');
		const hasDueDate = (!listDueDate && listDueDate === '');
		const hasItemsInList = (taskList && taskList.length === 0);

		return (hasDueDate || hasListName || hasItemsInList);
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
		const {
			listName, taskList, taskName,
			listDueDate, edition,
		} = this.state;

		return (
			<CardUi
				cardTitle="Create New Task List"
				isEdit={edition}
				listName={listName}
				taskName={taskName}
				taskList={taskList}
				refTask={this.refTask}
				disableCompletion={true}
				listDueDate={listDueDate}
				completeTask={() => null}
				createTask={this.createTask}
				updateTask={this.updateTask}
				hideTaskActionButtons={edition}
				onInputChange={this.onInputChange}
				cancelTaskUpdate={this.cancelTaskUpdate}
				saveUpdatedTask={this.updateSelectedTask}
				removeTaskFromList={this.removeTaskFromList}
				renderActionButtons={this.renderActionButtons()}
			/>
		)
	}
}

export default CreateTodoListRoute;
