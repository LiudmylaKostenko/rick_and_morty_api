import { requestFactory } from '../helpers/requestFactory';

// every method returns promise
export const charactersApi = {
	getApiCharacters(page) {
		const url = `character?page=${page}`; // search API using url and specific page
		const method = 'GET';
		return requestFactory(url, method);
	},
};

export const charactersApiByParams = {
	getApiCharactersBySearchParams(param) {
		const url = `character?${param}`; // search API using url and specific user's parameter
		const method = 'GET';
		return requestFactory(url, method);
	},
};
