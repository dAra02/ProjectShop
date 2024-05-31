import { transformTovar } from '../transformers';

export const getTovary = () =>
	fetch('http://localhost:3005/tovary')
		.then((loadedUsers) => loadedUsers.json())
		.then((loadedUsers) => loadedUsers && loadedUsers.map(transformTovar));
