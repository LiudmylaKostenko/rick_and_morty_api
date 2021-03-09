import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import CharacterItemComponent from './CharacterItemComponent';
import { ScrollContent } from '../../../styledComponents';
import {
	getCharacters,
	addNewCharacters,
	loadingCharactersStart,
	loadingCharactersSuccess,
	setCurrentPageOfCharacters,
	setSelectedCharacters,
} from '../../../reduxStore/characters/actions';
import RowComponent from '../Row';
import DetailsComponent from './CharactersDetailsComponent';
import uniqid from 'uniqid';
import PropTypes from 'prop-types';

const CharactersPage = ({ history }) => {
	const dispatch = useDispatch();
	const loading = useSelector((state) => state.characterReducer.loadingCharacters);
	const countPages = useSelector((state) => state.characterReducer.totalPagesCharacters);
	const characters = useSelector((state) => state.characterReducer.allCharacters);
	const firstPageLoaded = useSelector((state) => state.characterReducer.setFirstApi);

	const [currentPage, setCurrentPage] = useState(1);

	const handleScroll = (event) => {
		const { scrollTop, clientHeight, scrollHeight } = event.currentTarget; // listening scrolling list characters
		if (scrollHeight - scrollTop === clientHeight && currentPage < countPages) {
			setCurrentPage((prev) => prev + 1);
			dispatch(setCurrentPageOfCharacters(currentPage)); // dispatch action to set new current page for next request into API
		} else if (currentPage === countPages) {
			alert(`all dataApi is loaded`);
		}
	};
	//
	const onItemSelected = (id) => {
		history.push(`/characters/${id}`);
		const selectedItem = characters.filter((item) => item.id === id); // filter allCharacters and return selected item . then dispatch to store
		dispatch(setSelectedCharacters(selectedItem));
	};

	useEffect(() => {
		const loadCharacters = async () => {
			// async func
			if (firstPageLoaded === true) {
				// if array already not empty = useEffect will work when currentPage changed
				dispatch(loadingCharactersStart); // dispatch loading new request with data start
				const newListOfCharacters = await dispatch(getCharacters(currentPage, true)); // wait for request and dispatch into store new list
				dispatch(addNewCharacters(newListOfCharacters.results));
				dispatch(loadingCharactersSuccess); // dispatch loading new request with data success
			}
		};
		loadCharacters();
	}, [currentPage]);

	return (
		<RowComponent
			left={
				<div>
					<ScrollContent onScroll={handleScroll}>
						{characters &&
							characters.map((
								character // map every item of characters list and display on page
							) => (
								<CharacterItemComponent
									onItemSelected={onItemSelected}
									key={uniqid.process()}
									id={character.id}
									character={character.name}
								/>
							))}

						{/* if loading always display it to user */}
					</ScrollContent>
					{loading && <p className="loading-info">Wait please, Loading</p>}
				</div>
			}
			right={<DetailsComponent />}
		/>
	);
};

CharactersPage.propTypes = {
	history: PropTypes.object.isRequired,
};

export default connect(null, null)(CharactersPage); // connect = connects component with  redux store
