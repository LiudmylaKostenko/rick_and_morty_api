import { requestFactory } from '../helpers/requestFactory';

// every method returns promise
export const episodesApi = {
	getApiEpisodes(page) {
		const url = `episode?page=${page}`; // search API using url and specific page
		const method = 'GET';
		return requestFactory(url, method);
	},
};

export const episodesApiByParams = {
	getApiEpisodesBySearchParams(param) {
		const url = `episode?${param}`; // search API using url and specific user's parameter
		const method = 'GET';
		return requestFactory(url, method);
	},
};
