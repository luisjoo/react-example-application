import React from 'react';
import Proptypes from "prop-types";

const ButtonComponent = (props) => {
	return (
		<button
			className="btn light-blue darken-2 waves-effect white-text"
			onClick={props.clickMethod}
		>
			{props.buttonText}
		</button>
	);
};

ButtonComponent.propTypes = {
	clickMethod: Proptypes.func.isRequired,
	buttonText: Proptypes.string.isRequired,
};

export default ButtonComponent;
