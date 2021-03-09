import { charactersApi, charactersApiByParams } from '../../service/api/characters';
import {
	GET_CHARACTERS,
	ADD_NEW_CHARACTERS,
	LOADING_OF_CHARACTERS_START,
	LOADING_OF_CHARACTERS_SUCCESS,
	SET_LIST_CHARACTERS,
	SET_CURRENT_PAGE_OF_CHARACTERS,
	SET_SELECTED_CHARACTERS,
	GET_API_CHARACTERS_BY_SEARCH_PARAMS,
	UPDATING_CHARACTERS_BY_PARAMS_START,
	UPDATING_CHARACTERS_BY_PARAMS_SUCCESS,
	UPDATE_API_CHARACTERS_BY_NAME,
	SET_DEFAULT_LIST_CHARACTERS,
} from './actionTypes';

export const getCharacters = (currentPage, loading) => async (dispatch) => {
	try {
		const data = await charactersApi.getApiCharacters(currentPage);
		dispatch({ type: GET_CHARACTERS, data, payload: loading });
		return data; // get all characters from api and dispatch into store
	} catch (err) {
		throw new Error(err);
	}
};

export const getCharactersBySearchParams = (params) => async (dispatch) => {
	try {
		const data = await charactersApiByParams.getApiCharactersBySearchParams(params);
		dispatch({ type: GET_API_CHARACTERS_BY_SEARCH_PARAMS, payload: data }); // get Characters list by user's query
		return data;
	} catch (err) {
		throw new Error(err);
	}
};

export const filterCharactersByName = (data) => (dispatch) => {
	try {
		dispatch({ type: UPDATE_API_CHARACTERS_BY_NAME, payload: data });
		return data; // filter characters list by name
	} catch (err) {
		throw new Error(err);
	}
};

export const loadingCharactersStart = {
	type: LOADING_OF_CHARACTERS_START, // dispatch action with information - loading start
};

export const loadingCharactersSuccess = {
	type: LOADING_OF_CHARACTERS_SUCCESS, // dispatch action with information - loading success
};

export const setListCharacters = {
	type: SET_LIST_CHARACTERS,
};
// set default list with all characters
export const setDefaultListCharacters = {
	type: SET_DEFAULT_LIST_CHARACTERS,
};

export const updatingCharactersByParamsStart = {
	type: UPDATING_CHARACTERS_BY_PARAMS_START, // updating allCharacter list by parameters
};

export const updatingCharactersByParamsSuccess = {
	type: UPDATING_CHARACTERS_BY_PARAMS_SUCCESS,
};

export const addNewCharacters = (list) => (dispatch) => {
	// dispatch action with type to store -- adding  new page's results into list of characters
	dispatch({ type: ADD_NEW_CHARACTERS, payload: list });
};

export const setCurrentPageOfCharacters = (newPage) => (dispatch) => {
	// dispatch action with setting what current page
	dispatch({ type: SET_CURRENT_PAGE_OF_CHARACTERS, payload: newPage });
};

export const setSelectedCharacters = (item) => (dispatch) => {
	// dispatch action to set selected character for information
	dispatch({ type: SET_SELECTED_CHARACTERS, payload: item });
};
