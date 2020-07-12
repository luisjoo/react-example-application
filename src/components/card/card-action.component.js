import React from 'react';

const CardActionComponent = (props) => {
	return (
		<div className="card-action">
			{props.children}
		</div>
	);
};

export default CardActionComponent;
