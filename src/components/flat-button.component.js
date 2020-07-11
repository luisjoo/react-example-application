import React from 'react';
import Proptypes from 'prop-types';

const FlatButtonComponent = (props) =>{
	return (
		<button
			className="btn-flat black-text waves-effect waves-light"
			onClick={props.clickMethod}
		>
			{props.buttonText}
		</button>
	);
};

FlatButtonComponent.propTypes = {
	clickMethod: Proptypes.func.isRequired,
	buttonText: Proptypes.string.isRequired,
};

export default FlatButtonComponent;
