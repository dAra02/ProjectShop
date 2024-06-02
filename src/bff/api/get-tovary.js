import { transformTovar } from '../transformers';

export const getTovary = (page, limit) =>
	fetch(`http://localhost:3005/tovary?_page=${page}&_limit=${limit}`)
		.then((loadedTovary) => Promise.all([loadedTovary.json(), loadedTovary.headers.get('Link')]))
		.then(([loadedTovary, links]) => ({
			tovary: loadedTovary && loadedTovary.map(transformTovar),
			links,
		}));
