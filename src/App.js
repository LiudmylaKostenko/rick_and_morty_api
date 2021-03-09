import React, * as react from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './ui/components/Header';
import './app.scss';
import CharactersPage from './ui/components/Characters/CharactersComponent';
import LocationsPage from './ui/components/Locations/LocationsComponent';
import EpisodesPage from './ui/components/Episodes/EpisodesComponent';
import NotFoundPage from './ui/components/NotFound';
import { history } from './reduxStore/store';
import HomePage from './ui/components/Home/HomeComponent';

class App extends react.Component {
	render() {
		return (
			<Router history={history}>
				<div className="api-app">
					<Header />
					<Switch>
						<Route path="/" component={HomePage} exact />
						{/* home page */}
						<Route path="/characters/:id?" component={CharactersPage} />
						{/* //page of characters */}
						<Route path="/locations/:id?" component={LocationsPage} />
						{/* page of locations */}
						<Route path="/episodes/:id?" component={EpisodesPage} />
						{/* page episodes * */}
						<Route render={() => <NotFoundPage />} />
						{/* //if page not found */}
					</Switch>
				</div>
			</Router>
		);
	}
}

export default connect(null, null)(App);
