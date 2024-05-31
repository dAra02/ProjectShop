import { transformTovar } from '../transformers';

export const getTovar = async (tovarId) =>
	fetch(`http://localhost:3005/tovary/${tovarId}`)
		.then((loadedTovar) => loadedTovar.json())
		.then((loadedTovar) => loadedTovar && transformTovar(loadedTovar));
