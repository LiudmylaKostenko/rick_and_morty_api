import React from 'react';
import { connect, useSelector } from 'react-redux';
import './DetailsComponent.scss';
import uniqid from 'uniqid';

const CharactersDetailsComponent = () => {
	const selectedCharacter = useSelector((state) => state.characterReducer.selectedCharacter);

	return (
		<div className="details">
			<span className="title-details">Choose what character you want</span>
			{selectedCharacter.map((item) => {
				return (
					<ul key={uniqid.process()} className="list-group">
						<li className="item-img">
							{/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
							<img src={item.image} alt={`image-of-${item.name}`} />
						</li>
						{/* every item return full info */}
						<li className="list-group-item">
							<span>id</span>
							{item.id}
						</li>
						<li className="list-group-item">
							<span>name</span>
							{item.name}
						</li>
						<li className="list-group-item">
							<span>status</span>
							{item.status}
						</li>
						<li className="list-group-item">
							<span>species</span>
							{item.species}
						</li>
						<li className="list-group-item">
							<span>type</span>
							{item.type}
						</li>
						<li className="list-group-item">
							<span>gender</span>
							{item.gender}
						</li>
						<li className="list-group-item">
							<span>origin-name</span>
							{item.origin.name}
						</li>
						<li className="list-group-item">
							<span>origin-url</span>
							<a href={item.origin.url}>{item.origin.url}</a>
						</li>
						<li className="list-group-item">
							<span>location-name</span>
							{item.location.name}
						</li>
						<li className="list-group-item">
							<span>location-url</span>
							<a href={item.location.url}>{item.location.url}</a>
						</li>
						<li className="list-group-item">
							<span>url</span>
							<a href={item.url}>{item.url}</a>
						</li>
						<li className="list-group-item">
							<span>created</span>
							{item.created}
						</li>
						{item.episode.map((episode) => {
							return (
								<li key={uniqid.process()} className="list-group-item">
									<span>episodes</span>
									<a href={episode}>{episode}</a>
								</li>
							);
						})}
					</ul>
				);
			})}
		</div>
	);
};

export default connect(null, null)(CharactersDetailsComponent); // connect = connects component with  redux store
