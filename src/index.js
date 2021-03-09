import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { store, persistor } from './reduxStore/store';
import { PersistGate } from 'redux-persist/integration/react';
import ErrorBoundary from './ui/components/ErrorBoundary/ErrorBoundaryContainer';

// store - own configure store redux
// using provider to share data from store to all inside if need
// if error will show window that something is wrong..

ReactDOM.render(
	<Provider store={store}>
		<PersistGate persistor={persistor}>
			<ErrorBoundary>
				<App />
			</ErrorBoundary>
		</PersistGate>
	</Provider>,
	document.getElementById('root')
);

