import { getTovary } from '../api';

export const fetchTovary = async (page, limit) => {
	const { tovary, links } = await getTovary(page, limit);

	return {
		error: null,
		res: { tovary, links },
	};
};
