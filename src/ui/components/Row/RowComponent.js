import React from 'react';
import './RowComponent.scss';
import PropTypes from 'prop-types';

const RowComponent = ({ left, right }) => {
	return (
		<div className="row mb2">
			<div className="col-md-6">{left}</div>
			<div className="col-md-6">{right}</div>
		</div>
	);
};

RowComponent.propTypes = {
	left: PropTypes.node,
	right: PropTypes.node,
};

export default RowComponent;
