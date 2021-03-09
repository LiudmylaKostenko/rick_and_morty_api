import React from 'react';
import { connect, useSelector } from 'react-redux';
import '../Characters/DetailsComponent.scss';
import uniqid from 'uniqid';

const EpisodesDetailsComponent = () => {
	const selectedEpisode = useSelector((state) => state.episodeReducer.selectedEpisode);
	return (
		<div className="details">
			<span className="title-details">Choose what Episode you want</span>
			{selectedEpisode.map((item) => {
				return (
					<ul key={uniqid.process()} className="list-group">
						<li className="item-img">
							{/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
							<img
								className="episode-img"
								src="https://www.denofgeek.com/wp-content/uploads/2017/07/rick-and-morty-portal.jpg?resize=768%2C432"
								alt={`image-of-${item.name}`}
							/>
						</li>
						<li className="list-group-item">
							<span>id</span>
							{item.id}
						</li>
						<li className="list-group-item">
							<span>name</span>
							{item.name}
						</li>
						<li className="list-group-item">
							<span>air-date</span>
							{item.air_date}
						</li>
						<li className="list-group-item">
							<span>episode</span>
							{item.episode}
						</li>
						{item.characters.map((characters) => {
							return (
								<li key={uniqid.process()} className="list-group-item">
									<span>characters</span>
									<a href={characters}>{characters}</a>
								</li>
							);
						})}
						<li className="list-group-item">
							<span>url</span>
							<a href={item.url}>{item.url}</a>
						</li>
						<li className="list-group-item">
							<span>created</span>
							{item.created}
						</li>
					</ul>
				);
			})}
		</div>
	);
};

export default connect(null, null)(EpisodesDetailsComponent); // connect = connects component with  redux store
