import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import LocationItemComponent from './LocationItemComponent';
import { ScrollContent } from '../../../styledComponents';
import {
	getLocations,
	addNewLocations,
	loadingLocationsStart,
	loadingLocationsSuccess,
	setCurrentPageOfLocations,
	setSelectedLocations,
} from '../../../reduxStore/locations/actions';
import RowComponent from '../Row';
import DetailsComponent from './LocationsDetailsComponent';
import uniqid from 'uniqid';
import PropTypes from 'prop-types';

const LocationsComponent = ({ history }) => {
	const dispatch = useDispatch();
	const loading = useSelector((state) => state.locationReducer.loadingLocations);
	const countPages = useSelector((state) => state.locationReducer.totalPagesLocations);
	const locations = useSelector((state) => state.locationReducer.allLocations);
	const firstPageLoaded = useSelector((state) => state.locationReducer.setFirstApi);

	const [currentPage, setCurrentPage] = useState(1);

	const handleScroll = (event) => {
		const { scrollTop, clientHeight, scrollHeight } = event.currentTarget; // listening scrolling list locations
		if (scrollHeight - scrollTop === clientHeight && currentPage < countPages) {
			setCurrentPage((prev) => prev + 1);
			dispatch(setCurrentPageOfLocations(currentPage)); // dispatch action to set new current page for next request into API
		} else if (currentPage === countPages) {
			alert(`all dataApi is loaded`);
		}
	};
	//
	const onItemSelected = (id) => {
		history.push(`/locations/${id}`);
		const selectedItem = locations.filter((item) => item.id === id); // filter allLocations and return selected item . then dispatch to store
		dispatch(setSelectedLocations(selectedItem));
	};

	useEffect(() => {
		const loadLocations = async () => {
			// async func
			if (firstPageLoaded === true) {
				// if array already not empty = useEffect will work when currentPage changed
				dispatch(loadingLocationsStart); // dispatch loading new request with data start
				const newListOfLocations = await dispatch(getLocations(currentPage, true)); // wait for request and dispatch into store new list
				dispatch(addNewLocations(newListOfLocations.results));
				dispatch(loadingLocationsSuccess); // dispatch loading new request with data success
			}
		};
		loadLocations();
	}, [currentPage]);

	return (
		<RowComponent
			left={
				<div>
					<ScrollContent onScroll={handleScroll}>
						{locations &&
							locations.map((
								location // map every item of locations list and display on page
							) => (
								<LocationItemComponent
									onItemSelected={onItemSelected}
									key={uniqid.process()}
									id={location.id}
									location={location.name}
								/>
							))}

						{/* if loading always display it to user */}
					</ScrollContent>
					{loading && <p className="loading-info">Wait please, Loading</p>}
				</div>
			}
			right={<DetailsComponent />}
		/>
	);
};

LocationsComponent.propTypes = {
	history: PropTypes.object.isRequired,
};

export default connect(null, null)(LocationsComponent); // connect = connects component with  redux store
