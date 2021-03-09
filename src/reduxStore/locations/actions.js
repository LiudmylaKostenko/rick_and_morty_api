import { locationsApi, locationsApiByParams } from '../../service/api/locations';
import {
	GET_LOCATIONS,
	ADD_NEW_LOCATIONS,
	LOADING_OF_LOCATIONS_START,
	LOADING_OF_LOCATIONS_SUCCESS,
	SET_LIST_LOCATIONS,
	SET_CURRENT_PAGE_OF_LOCATIONS,
	SET_SELECTED_LOCATIONS,
	GET_API_LOCATIONS_BY_SEARCH_PARAMS,
	UPDATING_LOCATIONS_BY_PARAMS_START,
	UPDATING_LOCATIONS_BY_PARAMS_SUCCESS,
	UPDATE_API_LOCATIONS_BY_NAME,
	SET_DEFAULT_LIST_LOCATIONS,
} from './actionTypes';

export const getLocations = (currentPage, loading) => async (dispatch) => {
	try {
		const data = await locationsApi.getApiLocations(currentPage);
		dispatch({ type: GET_LOCATIONS, data, payload: loading });
		return data; // get all locations from api and dispatch into store
	} catch (err) {
		throw new Error(err);
	}
};

export const getLocationsBySearchParams = (params) => async (dispatch) => {
	try {
		const data = await locationsApiByParams.getApiLocationsBySearchParams(params);
		dispatch({ type: GET_API_LOCATIONS_BY_SEARCH_PARAMS, payload: data }); // get Locations list by user's query
		return data;
	} catch (err) {
		throw new Error(err);
	}
};

export const filterLocationsByName = (data) => (dispatch) => {
	try {
		dispatch({ type: UPDATE_API_LOCATIONS_BY_NAME, payload: data });
		return data; // filter locations list by name
	} catch (err) {
		throw new Error(err);
	}
};

export const loadingLocationsStart = {
	type: LOADING_OF_LOCATIONS_START, // dispatch action with information - loading start
};

export const loadingLocationsSuccess = {
	type: LOADING_OF_LOCATIONS_SUCCESS, // dispatch action with information - loading success
};

export const setListLocations = {
	type: SET_LIST_LOCATIONS,
};
// set default list with all locations
export const setDefaultListLocations = {
	type: SET_DEFAULT_LIST_LOCATIONS,
};

export const updatingLocationsByParamsStart = {
	type: UPDATING_LOCATIONS_BY_PARAMS_START, // updating alllocations list by parameters
};

export const updatingLocationsByParamsSuccess = {
	type: UPDATING_LOCATIONS_BY_PARAMS_SUCCESS,
};

export const addNewLocations = (list) => (dispatch) => {
	// dispatch action with type to store -- adding  new page's results into list of locations
	dispatch({ type: ADD_NEW_LOCATIONS, payload: list });
};

export const setCurrentPageOfLocations = (newPage) => (dispatch) => {
	// dispatch action with setting what current page
	dispatch({ type: SET_CURRENT_PAGE_OF_LOCATIONS, payload: newPage });
};

export const setSelectedLocations = (item) => (dispatch) => {
	// dispatch action to set selected location for information
	dispatch({ type: SET_SELECTED_LOCATIONS, payload: item });
};
