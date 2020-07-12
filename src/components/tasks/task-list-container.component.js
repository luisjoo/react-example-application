import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import ContainerComponent from "../utils/container.component";
import CheckboxComponent from "../input/checkbox.component";

class TaskListContainerComponent extends PureComponent {
	renderTaskList = () => {
		const {
			taskList, completeTask, disableCompletion,
			removeFromList, updateItemInList
		} = this.props;

		return taskList.map((task) => (
			<CheckboxComponent
				key={task.taskId}
				taskName={task.taskName}
				disabled={disableCompletion}
				isChecked={task.taskCompleted}
				removeFromList={() => removeFromList(task.taskId)}
				updateItemInList={() => updateItemInList(task.taskId)}
				onChange={() => completeTask(task.taskId, task.taskCompleted)}
			/>
		));
	};

	render() {
		return (
			<ContainerComponent>
				{this.renderTaskList()}
			</ContainerComponent>
		);
	}
}

TaskListContainerComponent.propTypes = {
	taskList: PropTypes.arrayOf({
		taskId: PropTypes.number,
		taskName: PropTypes.string,
		taskCompleted: PropTypes.bool
	}),
	completeTask: PropTypes.func.isRequired,
	disableCompletion: PropTypes.bool.isRequired,
	removeFromList: PropTypes.func.isRequired,
	updateItemInList: PropTypes.func.isRequired,
};

export default TaskListContainerComponent;
