import { episodesApi, episodesApiByParams } from '../../service/api/episodes';
import {
	GET_EPISODES,
	ADD_NEW_EPISODES,
	LOADING_OF_EPISODES_START,
	LOADING_OF_EPISODES_SUCCESS,
	SET_LIST_EPISODES,
	SET_CURRENT_PAGE_OF_EPISODES,
	SET_SELECTED_EPISODES,
	GET_API_EPISODES_BY_SEARCH_PARAMS,
	UPDATING_EPISODES_BY_PARAMS_START,
	UPDATING_EPISODES_BY_PARAMS_SUCCESS,
	UPDATE_API_EPISODES_BY_NAME,
	SET_DEFAULT_LIST_EPISODES,
} from './actionTypes';

export const getEpisodes = (currentPage, loading) => async (dispatch) => {
	try {
		const data = await episodesApi.getApiEpisodes(currentPage);
		dispatch({ type: GET_EPISODES, data, payload: loading });
		return data; // get all episodes from api and dispatch into store
	} catch (err) {
		throw new Error(err);
	}
};

export const getEpisodesBySearchParams = (params) => async (dispatch) => {
	try {
		const data = await episodesApiByParams.getApiEpisodesBySearchParams(params);
		dispatch({ type: GET_API_EPISODES_BY_SEARCH_PARAMS, payload: data }); // get Episodes list by user's query
		return data;
	} catch (err) {
		throw new Error(err);
	}
};

export const filterEpisodesByName = (data) => (dispatch) => {
	try {
		dispatch({ type: UPDATE_API_EPISODES_BY_NAME, payload: data });
		return data; // filter Episodes list by name
	} catch (err) {
		throw new Error(err);
	}
};

export const loadingEpisodesStart = {
	type: LOADING_OF_EPISODES_START, // dispatch action with information - loading start
};

export const loadingEpisodesSuccess = {
	type: LOADING_OF_EPISODES_SUCCESS, // dispatch action with information - loading success
};

export const setListEpisodes = {
	type: SET_LIST_EPISODES,
};
// set default list with all Episodes
export const setDefaultListEpisodes = {
	type: SET_DEFAULT_LIST_EPISODES,
};

export const updatingEpisodesByParamsStart = {
	type: UPDATING_EPISODES_BY_PARAMS_START, // updating allEpisodes list by parameters
};

export const updatingEpisodesByParamsSuccess = {
	type: UPDATING_EPISODES_BY_PARAMS_SUCCESS,
};

export const addNewEpisodes = (list) => (dispatch) => {
	// dispatch action with type to store -- adding  new page's results into list of Episodes
	dispatch({ type: ADD_NEW_EPISODES, payload: list });
};

export const setCurrentPageOfEpisodes = (newPage) => (dispatch) => {
	// dispatch action with setting what current page
	dispatch({ type: SET_CURRENT_PAGE_OF_EPISODES, payload: newPage });
};

export const setSelectedEpisodes = (item) => (dispatch) => {
	// dispatch action to set selected Episode for information
	dispatch({ type: SET_SELECTED_EPISODES, payload: item });
};
