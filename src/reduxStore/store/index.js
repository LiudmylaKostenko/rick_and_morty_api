import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'; // devtools for debuggin what happened in store
import { rootReducer } from '../combineReducers';
import { createBrowserHistory } from 'history';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { routerMiddleware } from 'connected-react-router';

export const history = createBrowserHistory(); // use browserhistory

const persistConfig = {
	// configuration object for redux-persist
	key: 'API-test',
	// whitelist: ['locationReducer'], //white list what should be persist
	storage, // define which storage to use
};

const persistedReducer = persistReducer(persistConfig, rootReducer(history)); // create a persisted reducer

const middlewares = [thunkMiddleware, routerMiddleware(history)];

const enhancers = [applyMiddleware(...middlewares)]; // enchancers  applymiddleware will execute in order

const store = createStore(persistedReducer, composeWithDevTools(...enhancers)); // create custom store

const persistor = persistStore(store); // create persistor

export { store, persistor }; // return own made store configuration and persistor
