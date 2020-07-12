import React from 'react';
import PropTypes from 'prop-types';

const InputComponent = (props) => {
	return (
		<div className="input-field">
			<input
				disabled={props.disabled}
				value={props.value}
				className="validate"
				type={props.inputType}
				id={props.elementId}
				onChange={props.onChange}
			/>
			<label htmlFor={props.elementId}>
				{props.labelText}
			</label>
		</div>
	)
};

InputComponent.propTypes = {
	elementId: PropTypes.string.isRequired,
	inputType: PropTypes.string.isRequired,
	labelText: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	value: PropTypes.string.isRequired,
	disabled: PropTypes.bool
};

InputComponent.defaultProps = {
	disabled: false
};

export default InputComponent;
