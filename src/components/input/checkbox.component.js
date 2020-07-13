import React, {Fragment, PureComponent} from 'react';
import Proptypes from 'prop-types';

class CheckboxComponent extends PureComponent {
	renderActionButtons = () => {
		const {hideTaskActionButtons, removeFromList, updateItemInList} = this.props;
		if (hideTaskActionButtons) return null;

		return (
			<Fragment>
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
			</Fragment>
		)
	};

	render() {
		const {disabled, onChange, isChecked, taskName} = this.props;

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
				{this.renderActionButtons()}
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
	updateItemInList: Proptypes.func.isRequired,
	hideTaskActionButtons: Proptypes.bool
};

CheckboxComponent.defaultProps = {
	hideTaskActionButtons: false,
};

export default CheckboxComponent;
