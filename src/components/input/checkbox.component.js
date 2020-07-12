import React, {PureComponent} from 'react';
import Proptypes from 'prop-types';
import FlatButtonComponent from "../buttons/flat-button.component";

class CheckboxComponent extends PureComponent {
	test() {
		console.log('1')
	}

	render() {
		const {
			disabled, onChange, isChecked,
			taskName, removeFromList, updateItemInList
		} = this.props;

		return (
			<div className="row">
				<div className="col s8">
					<label className="left">
						<input
							type="checkbox"
							className="filled-in"
							checked={isChecked}
							disabled={disabled}
							onChange={() => onChange(!isChecked)}
						/>
						<span>{taskName}</span>
					</label>
				</div>
				<div className="col s2">
					<a className="btn-flat waves-effect small"
					   onClick={updateItemInList}>
						Update
					</a>
				</div>
				<div className="col s2">
					<a className="btn-flat waves-effect large"
					   onClick={removeFromList}>
						remove
					</a>
				</div>
			</div>
		);
	}
}

CheckboxComponent.propTypes = {
	isChecked: Proptypes.bool.isRequired,
	taskName: Proptypes.string.isRequired,
	onChange: Proptypes.func.isRequired,
	disabled: Proptypes.bool.isRequired,
	removeFromList: Proptypes.func.isRequired,
	updateItemInList: Proptypes.func.isRequired
};

export default CheckboxComponent;
