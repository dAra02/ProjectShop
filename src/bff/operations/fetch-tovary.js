import { getTovary } from '../api';

export const fetchTovary = async () => {
	const tovary = await getTovary();

	return {
		error: null,
		res: tovary,
	};
};
