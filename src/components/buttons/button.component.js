import React from 'react';
import Proptypes from "prop-types";

const ButtonComponent = (props) => {
	return (
		<button
			className="btn light-blue darken-2 waves-effect white-text small"
			onClick={props.clickMethod}
			disabled={props.disabled}
		>
			{props.buttonText}
		</button>
	);
};

ButtonComponent.propTypes = {
	clickMethod: Proptypes.func.isRequired,
	buttonText: Proptypes.string.isRequired,
	disabled: Proptypes.bool
};

ButtonComponent.defaultProps = {
	disabled: false,
};

export default ButtonComponent;
