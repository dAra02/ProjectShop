import { transformTovar } from '../transformers';

export const getTovary = (seatchPhrase, page, limit, sort, idCategor) => {
	const ALL_TOVARY_URL = `http://localhost:3005/tovary`;
	const SORT_TOVARY_URL = `http://localhost:3005/tovary?&_sort=price&_order=${sort}&title_like=${seatchPhrase}&_page=${page}&_limit=${limit}`;
	const FILTR_TOVARY_URL = `http://localhost:3005/tovary?&_sort=price&_order=${sort}&title_like=${seatchPhrase}&_page=${page}&_limit=${limit}&categor_id=${idCategor}`;

	const url = seatchPhrase === undefined ? ALL_TOVARY_URL : SORT_TOVARY_URL;

	return fetch(idCategor ? FILTR_TOVARY_URL : url)
		.then((loadedTovary) => Promise.all([loadedTovary.json(), loadedTovary.headers.get('Link')]))
		.then(([loadedTovary, links]) => ({
			tovary: loadedTovary && loadedTovary.map(transformTovar),
			links,
		}));
};
