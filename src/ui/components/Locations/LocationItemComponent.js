import { WrapperList } from '../../../styledComponents';
import PropTypes from 'prop-types';
import React from 'react';

const LocationItemComponent = ({ location, onItemSelected, id }) => (
	<WrapperList onClick={() => onItemSelected(id)}>
		<span>{location}</span>
	</WrapperList>
);

export default LocationItemComponent;

LocationItemComponent.propTypes = {
	location: PropTypes.string,
	onItemSelected: PropTypes.func,
	id: PropTypes.number,
};
