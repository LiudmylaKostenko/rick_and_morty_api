import {
	GET_LOCATIONS,
	ADD_NEW_LOCATIONS,
	LOADING_OF_LOCATIONS_SUCCESS,
	LOADING_OF_LOCATIONS_START,
	SET_LIST_LOCATIONS,
	SET_CURRENT_PAGE_OF_LOCATIONS,
	SET_SELECTED_LOCATIONS,
	GET_API_LOCATIONS_BY_SEARCH_PARAMS,
	UPDATE_API_LOCATIONS_BY_NAME,
	SET_DEFAULT_LIST_LOCATIONS,
} from './actionTypes';

const initialState = {
	currentPageLocations: 0,
	locationsFromPage: [],
	allLocations: [],
	loadingLocations: true,
	totalPagesLocations: 3,
	setFirstApi: false,
	selectedLocation: [],
	locationsByParams: [], // initial state locations reducer
};

//
export const locationReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_LOCATIONS:
			return {
				...state,
				locationsFromPage: action.data, // return dataApi from page
				totalPagesLocations: action.data.info.pages, // count pages from API
			};

		case GET_API_LOCATIONS_BY_SEARCH_PARAMS:
			return {
				...state, // return new array from API after users param in search input
				allLocations: [...state.locationsByParams, ...action.payload.results],
			};

		case UPDATE_API_LOCATIONS_BY_NAME:
			return {
				...state, // return new array from API after users param = name in search input
				allLocations: [...state.locationsByParams, ...action.payload],
			};

		case SET_LIST_LOCATIONS:
			return {
				...state,
				setFirstApi: true,
			};

		case SET_DEFAULT_LIST_LOCATIONS:
			return {
				...state,
				allLocations: state.locationsFromPage.results, // if list is emty - store return locations from current page
			};

		case ADD_NEW_LOCATIONS:
			return {
				...state,
				allLocations: [...state.allLocations, ...action.payload], // return new array with added new locations pushed into the end
				currentPageLocations: state.currentPageLocations + 1,
			};

		case LOADING_OF_LOCATIONS_START:
			return {
				...state,
				loadingLocations: true, // il loading or not
			};
		case LOADING_OF_LOCATIONS_SUCCESS:
			return {
				...state,
				loadingLocations: false,
			};

		case SET_CURRENT_PAGE_OF_LOCATIONS:
			return {
				...state,
				currentPageLocations: action.payload, // set currentPage into redux store
			};

		case SET_SELECTED_LOCATIONS:
			return {
				...state,
				selectedLocation: action.payload, // return selected location by id
			};

		default:
			return state;
	}
};
