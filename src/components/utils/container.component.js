import React from 'react';

const ContainerComponent = (props) => {
	return (
		<div className="container">
			{props.children}
		</div>
	);
};

export default ContainerComponent;
