import { transformTovar } from '../transformers';

export const getTovary = (seatchPhrase, page, limit) => {
	const ALL_TOVARY_URL = `http://localhost:3005/tovary`;
	const SORT_TOVARY_URL = `http://localhost:3005/tovary?title_like=${seatchPhrase}&_page=${page}&_limit=${limit}`;

	const url = seatchPhrase === undefined ? ALL_TOVARY_URL : SORT_TOVARY_URL;

	return fetch(url)
		.then((loadedTovary) => Promise.all([loadedTovary.json(), loadedTovary.headers.get('Link')]))
		.then(([loadedTovary, links]) => ({
			tovary: loadedTovary && loadedTovary.map(transformTovar),
			links,
		}));
};
