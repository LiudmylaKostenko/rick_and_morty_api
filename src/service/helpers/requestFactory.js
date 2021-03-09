import fetch from 'isomorphic-fetch';
import { BASE_API_URL } from '../../config';

const requestFactory = async (url, method, data) => {
	try {
		const apiUrl = BASE_API_URL + url; // final request url with base api and different user's search
		const res = await fetch(apiUrl, {
			// request for Api
			method, // method get
			body: data,
		});
		if (!res.ok) {
			throw new Error('Error!');
		}
		return res.json(); // json- format
	} catch (err) {
		throw new Error(err);
	}
};

export { requestFactory };
