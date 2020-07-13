import React from 'react';
import PropTypes from 'prop-types';

const IconInputComponent = (props) => {
	return (
		<div className="input-field">
			<i className="material-icons prefix">{props.iconName}</i>
			<label htmlFor={props.inputId}>{props.labelName}</label>
			<input
				id={props.inputId}
				value={props.value}
				type={props.inputType}
				onKeyUp={props.onKeyUp}
				ref={props.taskReference}
				onChange={props.onChange}
			/>
		</div>
	);
};

IconInputComponent.propTypes = {
	labelName: PropTypes.string.isRequired,
	inputType: PropTypes.string.isRequired,
	iconName: PropTypes.string.isRequired,
	inputId: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	onKeyUp: PropTypes.func.isRequired,
	value: PropTypes.string.isRequired,
	otherProps: PropTypes.object,
	taskReference: PropTypes.any
};

IconInputComponent.defaultProps = {
	onKeyUp: (event) => {
		event.preventDefault();
	},
	inputType: "text",
	otherProps: {}
};

export default IconInputComponent;

