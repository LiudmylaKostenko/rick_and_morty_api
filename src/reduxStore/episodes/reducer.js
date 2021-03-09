import {
	GET_EPISODES,
	ADD_NEW_EPISODES,
	LOADING_OF_EPISODES_SUCCESS,
	LOADING_OF_EPISODES_START,
	SET_LIST_EPISODES,
	SET_CURRENT_PAGE_OF_EPISODES,
	SET_SELECTED_EPISODES,
	GET_API_EPISODES_BY_SEARCH_PARAMS,
	UPDATE_API_EPISODES_BY_NAME,
	SET_DEFAULT_LIST_EPISODES,
} from './actionTypes';

const initialState = {
	currentPageEpisodes: 0,
	episodesFromPage: [],
	allEpisodes: [],
	loadingEpisodes: true,
	totalPagesEpisodes: 3,
	setFirstApi: false,
	selectedEpisode: [],
	episodesByParams: [], // initial state episodes reducer
};

//
export const episodeReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_EPISODES:
			return {
				...state,
				episodesFromPage: action.data, // return dataApi from page
				totalPagesEpisodes: action.data.info.pages, // count pages from API
			};

		case GET_API_EPISODES_BY_SEARCH_PARAMS:
			return {
				...state, // return new array from API after users param in search input
				allEpisodes: [...state.episodesByParams, ...action.payload.results],
			};

		case UPDATE_API_EPISODES_BY_NAME:
			return {
				...state, // return new array from API after users param = name in search input
				allEpisodes: [...state.episodesByParams, ...action.payload],
			};

		case SET_LIST_EPISODES:
			return {
				...state,
				setFirstApi: true,
			};

		case SET_DEFAULT_LIST_EPISODES:
			return {
				...state,
				allEpisodes: state.episodesFromPage.results, // if list is empty - store return EPISODES from current page
			};

		case ADD_NEW_EPISODES:
			return {
				...state,
				allEpisodes: [...state.allEpisodes, ...action.payload], // return new array with added new Episodes pushed into the end
				currentPageEpisodes: state.currentPageEpisodes + 1,
			};

		case LOADING_OF_EPISODES_START:
			return {
				...state,
				loadingEpisodes: true, // il loading or not
			};
		case LOADING_OF_EPISODES_SUCCESS:
			return {
				...state,
				loadingEpisodes: false,
			};

		case SET_CURRENT_PAGE_OF_EPISODES:
			return {
				...state,
				currentPageEpisodes: action.payload, // set currentPage into redux store
			};

		case SET_SELECTED_EPISODES:
			return {
				...state,
				selectedEpisode: action.payload, // return selected episode by id
			};

		default:
			return state;
	}
};
