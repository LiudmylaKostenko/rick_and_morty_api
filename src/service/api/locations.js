import { requestFactory } from '../helpers/requestFactory';

// every method returns promise
export const locationsApi = {
	getApiLocations(page) {
		const url = `location?page=${page}`; // search API using url and specific page
		const method = 'GET';
		return requestFactory(url, method);
	},
};

export const locationsApiByParams = {
	getApiLocationsBySearchParams(param) {
		const url = `location?${param}`; // search API using url and specific user's parameter
		const method = 'GET';
		return requestFactory(url, method);
	},
};
