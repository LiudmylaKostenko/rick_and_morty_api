import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import EpisodeItemComponent from './EpisodeItemComponent';
import { ScrollContent } from '../../../styledComponents';
import {
	getEpisodes,
	addNewEpisodes,
	loadingEpisodesStart,
	loadingEpisodesSuccess,
	setCurrentPageOfEpisodes,
	setSelectedEpisodes,
} from '../../../reduxStore/Episodes/actions';
import RowComponent from '../Row';
import DetailsComponent from './EpisodesDetailsComponent';
import uniqid from 'uniqid';
import PropTypes from 'prop-types';

const EpisodesComponent = ({ history }) => {
	const dispatch = useDispatch();
	const loading = useSelector((state) => state.episodeReducer.loadingEpisodes);
	const countPages = useSelector((state) => state.episodeReducer.totalPagesEpisodes);
	const episodes = useSelector((state) => state.episodeReducer.allEpisodes);
	const firstPageLoaded = useSelector((state) => state.episodeReducer.setFirstApi);

	const [currentPage, setCurrentPage] = useState(1);

	const handleScroll = (event) => {
		const { scrollTop, clientHeight, scrollHeight } = event.currentTarget; // listening scrolling list Episodes
		if (scrollHeight - scrollTop === clientHeight && currentPage < countPages) {
			setCurrentPage((prev) => prev + 1);
			dispatch(setCurrentPageOfEpisodes(currentPage)); // dispatch action to set new current page for next request into API
		} else if (currentPage === countPages) {
			alert(`all dataApi is loaded`);
		}
	};
	//
	const onItemSelected = (id) => {
		history.push(`/episodes/${id}`);
		const selectedItem = episodes.filter((item) => item.id === id); // filter allEpisodes and return selected item . then dispatch to store
		dispatch(setSelectedEpisodes(selectedItem));
	};

	useEffect(() => {
		const loadEpisodes = async () => {
			// async func
			if (firstPageLoaded === true) {
				// if array already not empty = useEffect will work when currentPage changed
				dispatch(loadingEpisodesStart); // dispatch loading new request with data start
				const newListOfEpisodes = await dispatch(getEpisodes(currentPage, true)); // wait for request and dispatch into store new list
				dispatch(addNewEpisodes(newListOfEpisodes.results));
				dispatch(loadingEpisodesSuccess); // dispatch loading new request with data success
			}
		};
		loadEpisodes();
	}, [currentPage]);

	return (
		<RowComponent
			left={
				<div>
					<ScrollContent onScroll={handleScroll}>
						{episodes &&
							episodes.map((
								episode // map every item of Episodes list and display on page
							) => (
								<EpisodeItemComponent
									onItemSelected={onItemSelected}
									key={uniqid.process()}
									id={episode.id}
									episode={episode.name}
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

EpisodesComponent.propTypes = {
	history: PropTypes.object.isRequired,
};

export default connect(null, null)(EpisodesComponent); // connect = connects component with  redux store
