import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import {
	getCharacters,
	loadingCharactersStart,
	setListCharacters,
	loadingCharactersSuccess,
} from '../../../reduxStore/characters/actions';
import {
	getLocations,
	loadingLocationsStart,
	setListLocations,
	loadingLocationsSuccess,
} from '../../../reduxStore/locations/actions';
import {
	getEpisodes,
	loadingEpisodesStart,
	setListEpisodes,
	loadingEpisodesSuccess,
} from '../../../reduxStore/episodes/actions';

const HomeComponent = () => {
	const dispatch = useDispatch(); // use hooks
	const firstPageLoadedCharacters = useSelector((state) => state.characterReducer.setFirstApi);
	const firstPageLoadedLocations = useSelector((state) => state.locationReducer.setFirstApi);
	const firstPageLoadedEpisodes = useSelector((state) => state.episodeReducer.setFirstApi);
	const currentPageCharacters = useSelector((state) => state.characterReducer.currentPageCharacters);
	const currentPageLocations = useSelector((state) => state.locationReducer.currentPageLocations);
	const currentPageEpisodes = useSelector((state) => state.episodeReducer.currentPageEpisodes);

	useEffect(() => {
		const startLoading = async () => {
			if (
				firstPageLoadedCharacters === false &&
				firstPageLoadedLocations === false &&
				firstPageLoadedEpisodes === false
			) {
				dispatch(setListCharacters);
				dispatch(setListLocations);
				dispatch(setListEpisodes);
				// when application start ,async func send request  to receive first list before user link to page with api results
				dispatch(loadingCharactersStart);
				dispatch(loadingLocationsStart);
				dispatch(loadingEpisodesStart);
				await dispatch(getCharacters(currentPageCharacters, true));
				dispatch(loadingCharactersSuccess);
				await dispatch(getLocations(currentPageLocations, true));
				dispatch(loadingLocationsSuccess);
				await dispatch(getEpisodes(currentPageEpisodes, true));
				dispatch(loadingEpisodesSuccess);
			}
		};
		startLoading();
	}, []);

	return <h2>Welcome to test work with Api</h2>;
};

export default connect(null, null)(HomeComponent);
