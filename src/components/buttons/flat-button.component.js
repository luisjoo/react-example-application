import React from 'react';
import Proptypes from 'prop-types';

const FlatButtonComponent = (props) =>{
	return (
		<button
			className="btn-flat black-text waves-effect waves-light"
			onClick={props.clickMethod}
			disabled={props.disabled}
		>
			{props.buttonText}
		</button>
	);
};

FlatButtonComponent.propTypes = {
	clickMethod: Proptypes.func.isRequired,
	buttonText: Proptypes.string.isRequired,
	disabled: Proptypes.bool
};

FlatButtonComponent.defaultProp = {
	disabled: false
};

export default FlatButtonComponent;
