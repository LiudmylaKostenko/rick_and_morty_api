import {
	GET_CHARACTERS,
	ADD_NEW_CHARACTERS,
	LOADING_OF_CHARACTERS_SUCCESS,
	LOADING_OF_CHARACTERS_START,
	SET_LIST_CHARACTERS,
	SET_CURRENT_PAGE_OF_CHARACTERS,
	SET_SELECTED_CHARACTERS,
	GET_API_CHARACTERS_BY_SEARCH_PARAMS,
	UPDATE_API_CHARACTERS_BY_NAME,
	SET_DEFAULT_LIST_CHARACTERS,
} from './actionTypes';

const initialState = {
	currentPageCharacters: 0,
	charactersFromPage: [],
	allCharacters: [],
	loadingCharacters: true,
	totalPagesCharacters: 3,
	setFirstApi: false,
	selectedCharacter: [],
	charactersByParams: [], // initial state characters reducer
};

//
export const characterReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_CHARACTERS:
			return {
				...state,
				charactersFromPage: action.data, // return dataApi from page
				totalPagesCharacters: action.data.info.pages, // count pages from API
			};

		case GET_API_CHARACTERS_BY_SEARCH_PARAMS:
			return {
				...state, // return new array from API after users param in search input
				allCharacters: [...state.charactersByParams, ...action.payload.results],
			};

		case UPDATE_API_CHARACTERS_BY_NAME:
			return {
				...state, // return new array from API after users param = name in search input
				allCharacters: [...state.charactersByParams, ...action.payload],
			};

		case SET_LIST_CHARACTERS:
			return {
				...state,
				setFirstApi: true,
			};

		case SET_DEFAULT_LIST_CHARACTERS:
			return {
				...state,
				allCharacters: state.charactersFromPage.results, // if list is emty - store return characters from current page
			};

		case ADD_NEW_CHARACTERS:
			return {
				...state,
				allCharacters: [...state.allCharacters, ...action.payload], // return new array with added new characters pushed into the end
				currentPageCharacters: state.currentPageCharacters + 1,
			};

		case LOADING_OF_CHARACTERS_START:
			return {
				...state,
				loadingCharacters: true, // il loading or not
			};
		case LOADING_OF_CHARACTERS_SUCCESS:
			return {
				...state,
				loadingCharacters: false,
			};

		case SET_CURRENT_PAGE_OF_CHARACTERS:
			return {
				...state,
				currentPageCharacters: action.payload, // set currentPage into redux store
			};

		case SET_SELECTED_CHARACTERS:
			return {
				...state,
				selectedCharacter: action.payload, // return selected character by id
			};

		default:
			return state;
	}
};
