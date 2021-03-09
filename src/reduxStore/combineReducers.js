import { combineReducers } from 'redux';
import { characterReducer } from './characters/reducer';
import { locationReducer } from './locations/reducer';
import { episodeReducer } from './episodes/reducer';

export const rootReducer = () =>
	// combine reducer connects all reducer for work with store
	combineReducers({
		characterReducer,
		locationReducer,
		episodeReducer,
	});
