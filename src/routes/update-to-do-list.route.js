import React, {Component, Fragment} from 'react';
import Moment from "moment";
import Constants from "../utils/Contants";
import FlatButtonComponent from "../components/buttons/flat-button.component";
import ButtonComponent from "../components/buttons/button.component";
import CreateToDCardUi from "../ui/create-to-d-card.ui";
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {updateToDoList} from "../store/action";
import Toast from "../utils/toast";

class UpdateToDoListRoute extends Component {
	constructor(props) {
		super(props);

		this.refTask = React.createRef();
		this.state = this.getInitialState();
	}

	componentDidMount() {
		const {match, toDoList} = this.props;
		const {listId} = match.params;

		const list = toDoList.find(list => list.listId === parseInt(listId));
		console.log({list, toDoList, listId});
		this.setState(list);
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

	saveTaskList = () => {
		const {listName, taskList, listDueDate, listId, listStatus} = this.state;
		const {updateToDoList} = this.props;

		const toDoList = {
			listId,
			taskList,
			listName,
			listStatus,
			listDueDate,
		};

		updateToDoList(toDoList);
		Toast.success('To Do List Updated!');
		this.goBack();
	};

	goBack = () => {
		const {history} = this.props;
		history.goBack();
	};

	renderActionButtons = () => {
		return (
			<Fragment>
				<FlatButtonComponent
					clickMethod={this.goBack}
					buttonText="Cancel Update"
				/>
				<ButtonComponent
					clickMethod={this.saveTaskList}
					buttonText="Save Changes"
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
				cardTitle="Update To Do List"
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

const mapStateToProps = (_state) => ({
	toDoList: _state.toDoLists
});

const mapDispatchToProps = (_dispatch) => ({
	updateToDoList: (updateList) => {
		_dispatch(updateToDoList(updateList))
	}
});

const withRouterComponent = withRouter(UpdateToDoListRoute);
export default connect(mapStateToProps, mapDispatchToProps)(withRouterComponent);
