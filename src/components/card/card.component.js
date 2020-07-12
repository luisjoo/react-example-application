import React from 'react';
import PropTypes from 'prop-types';
import CardActionComponent from "./card-action.component";


const CardComponent = (props) => {
	return (
		<div className="col s12 m8 l6 offset-l3 offset-m2">
			<div className="card blue-grey lighten-5">
				<div className="card-content white-text">
					<p className="card-title black-text">
						{props.cardTitle}
					</p>
				</div>
				<div className="card-content">
					{props.cardContent}
				</div>
				<CardActionComponent>
					{props.cardActions}
				</CardActionComponent>
			</div>
		</div>
	)
};

CardComponent.propTypes = {
	cardTitle: PropTypes.string.isRequired,
	cardActions: PropTypes.any.isRequired,
	cardContent: PropTypes.any.isRequired
};

export default CardComponent;
