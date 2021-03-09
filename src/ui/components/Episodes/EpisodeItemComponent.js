import { WrapperList } from '../../../styledComponents';
import PropTypes from 'prop-types';
import React from 'react';

const EpisodeItemComponent = ({ episode, onItemSelected, id }) => (
	<WrapperList onClick={() => onItemSelected(id)}>
		<span>{episode}</span>
	</WrapperList>
);

export default EpisodeItemComponent;

EpisodeItemComponent.propTypes = {
	episode: PropTypes.string,
	onItemSelected: PropTypes.func,
	id: PropTypes.number,
};
