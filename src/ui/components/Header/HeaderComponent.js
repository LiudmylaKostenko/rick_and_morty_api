import React, { useState } from 'react';
import './HeaderComponent.scss';
import { Link, withRouter } from 'react-router-dom';
import { connect, useDispatch, useSelector } from 'react-redux';
import {
	getCharactersBySearchParams,
	updatingCharactersByParamsStart,
	updatingCharactersByParamsSuccess,
	filterCharactersByName,
	setDefaultListCharacters,
} from '../../../reduxStore/characters/actions';
import {
	getLocationsBySearchParams,
	updatingLocationsByParamsStart,
	updatingLocationsByParamsSuccess,
	filterLocationsByName,
	setDefaultListLocations,
} from '../../../reduxStore/locations/actions';
import {
	getEpisodesBySearchParams,
	updatingEpisodesByParamsStart,
	updatingEpisodesByParamsSuccess,
	filterEpisodesByName,
	setDefaultListEpisodes,
} from '../../../reduxStore/episodes/actions';
import PropTypes from 'prop-types';

const HeaderComponent = ({ location }) => {
	const [paramOfSearch, setParamOfSearch] = useState(''); // inner own state
	const dispatch = useDispatch(); // use dispatch in func component with hook
	const allCharacters = useSelector((state) => state.characterReducer.allCharacters);
	const allLocations = useSelector((state) => state.locationReducer.allLocations);
	const allEpisodes = useSelector((state) => state.episodeReducer.allEpisodes);
	// hook useSelector help used values from state in func component

	const nameOfPage = location.pathname.toString().includes('characters')
		? 'Characters'
		: location.pathname.toString().includes('locations')
		? 'Locations'
		: 'Episodes';

	const onClickHandler = async (e) => {
		if (nameOfPage === 'Characters') {
			// request on updating list characters, locations by button click
			dispatch(updatingCharactersByParamsStart); // dispatch updating
			setParamOfSearch(e.target.value); // value from input used in request API , example   // name=rick&status=alive
			await dispatch(getCharactersBySearchParams(paramOfSearch));
			dispatch(updatingCharactersByParamsSuccess); // after dispatching updating = update success
		} else if (nameOfPage === 'Locations') {
			dispatch(updatingLocationsByParamsStart);
			setParamOfSearch(e.target.value);
			await dispatch(getLocationsBySearchParams(paramOfSearch));
			dispatch(updatingLocationsByParamsSuccess);
		} else if (nameOfPage === 'Episodes') {
			dispatch(updatingEpisodesByParamsStart);
			setParamOfSearch(e.target.value);
			await dispatch(getEpisodesBySearchParams(paramOfSearch));
			dispatch(updatingEpisodesByParamsSuccess);
		}
	};

	const onSearchHandler = (e) => {
		setParamOfSearch(e.target.value); // alive updating filter list characters, locations by name item from user's input

		if (nameOfPage === 'Characters') {
			if (allCharacters.length > 0) {
				const newListOfCharactersByName = allCharacters.filter(
					(item) =>
						item.name.toLocaleLowerCase() === paramOfSearch.toString().toLocaleLowerCase() ||
						item.name.toLocaleLowerCase().includes(`${paramOfSearch.toString().toLocaleLowerCase()}`)
				);
				dispatch(filterCharactersByName(newListOfCharactersByName));
			} else {
				dispatch(setDefaultListCharacters); // if after filter list is empty = set default such as results from current page
			}
		} else if (nameOfPage === 'Locations') {
			if (allLocations.length > 0) {
				const newListOfLocationsByName = allLocations.filter(
					(item) =>
						item.name.toLocaleLowerCase() === paramOfSearch.toString().toLocaleLowerCase() ||
						item.name.toLocaleLowerCase().includes(`${paramOfSearch.toString().toLocaleLowerCase()}`)
				);
				dispatch(filterLocationsByName(newListOfLocationsByName));
			} else {
				dispatch(setDefaultListLocations);
			}
		} else if (nameOfPage === 'Episodes') {
			if (allEpisodes.length > 0) {
				const newListOfEpisodesByName = allLocations.filter(
					(item) =>
						item.name.toLocaleLowerCase() === paramOfSearch.toString().toLocaleLowerCase() ||
						item.name.toLocaleLowerCase().includes(`${paramOfSearch.toString().toLocaleLowerCase()}`)
				);
				dispatch(filterEpisodesByName(newListOfEpisodesByName));
			} else {
				dispatch(setDefaultListEpisodes);
			}
		}
	};

	return (
		<div className="header d-flex">
			<h3>
				<Link to="/">Home</Link>
			</h3>
			<ul className="d-flex">
				<li>
					<Link to="/characters/">Characters</Link>
				</li>
				<li>
					<Link to="/locations/">Locations</Link>
				</li>
				<li>
					<Link to="/episodes/">Episodes</Link>
				</li>
			</ul>
			<p>search on parameters</p>
			<div className="form-outline">
				<input
					type="text"
					id="form1"
					className="form-control"
					onChange={onSearchHandler}
					placeholder="search characters by name"
				/>
			</div>
			<button className="btn-search" type="submit" onClick={onClickHandler}>
				{' '}
				Start{' '}
			</button>
			<p className="search-describe">search with new parameters in API</p>
		</div>
	);
};

HeaderComponent.propTypes = {
	location: PropTypes.object.isRequired,
};

export default withRouter(connect(null, null)(HeaderComponent));
