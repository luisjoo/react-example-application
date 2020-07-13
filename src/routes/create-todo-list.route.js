import React, {Component, Fragment} from 'react';
import FlatButtonComponent from "../components/buttons/flat-button.component";
import ButtonComponent from "../components/buttons/button.component";
import Moment from 'moment';
import Constants from "../utils/Contants";
import CreateToDCardUi from "../ui/create-to-d-card.ui";
import {connect} from 'react-redux'
import {addToDoList} from '../store/action'
import ToDoListStatus from "../utils/to-do-list-status";
import Toast from "../utils/toast";

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

		if(!taskName.trim()){
			Toast.error('You must write the name of the task');
			return;
		}

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
		Toast.success('Changes Saved!');
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

	saveTaskList = () => {
		const {listName, taskList,listDueDate} = this.state;
		const {addToDoList} = this.props;

		const toDoList = {
			taskList,
			listName,
			listDueDate,
			listId: Date.now(),
			listStatus: ToDoListStatus.OPEN,
		};

		addToDoList(toDoList);
		Toast.success('New To Do List Added');
		this.clearFields();
	};

	clearFields = () => {
		this.setState(this.getInitialState());
	};

	renderActionButtons = () => {
		return (
			<Fragment>
				<FlatButtonComponent
					clickMethod={this.clearFields}
					buttonText="Clear Fields"
				/>
				<ButtonComponent
					clickMethod={this.saveTaskList}
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
			<CreateToDCardUi
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

const mapStateToProps = () => ({});
const mapDispatchToProps = (_dispatch) => {
	return {
		addToDoList: todoList => {
			_dispatch(addToDoList(todoList))
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateTodoListRoute);
