import React from 'react';
import Proptypes from 'prop-types';

const CheckboxComponent = (props) => {
	return (
		<div className="row">
			<label className="left">
				<input
					type="checkbox"
					className="filled-in"
					onChange={() => props.onChange(!props.isChecked)}
					checked={props.isChecked}
				/>
				<span>{props.taskName}</span>
			</label>
		</div>
	);
};

CheckboxComponent.propTypes = {
	isChecked: Proptypes.bool.isRequired,
	taskName: Proptypes.string.isRequired,
	onChange: Proptypes.func.isRequired
};

export default CheckboxComponent;
