import React from 'react';

const RowComponent = (props) => {
	return (
		<div className="row">
			{props.children}
		</div>
	);
};

export default RowComponent;
