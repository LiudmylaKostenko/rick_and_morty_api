import React from 'react';
import PropTypes from 'prop-types';
import { WrapperList } from '../../../styledComponents';

const CharacterItemComponent = ({ character, onItemSelected, id }) => (
	<WrapperList onClick={() => onItemSelected(id)}>
		<span>{character}</span>
	</WrapperList>
);

export default CharacterItemComponent;

CharacterItemComponent.propTypes = {
	character: PropTypes.string,
	onItemSelected: PropTypes.func,
	id: PropTypes.number,
};
