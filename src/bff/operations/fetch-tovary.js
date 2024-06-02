import { getTovary } from '../api';

export const fetchTovary = async (seatchPhrase, page, limit) => {
	const { tovary, links } = await getTovary(seatchPhrase, page, limit);

	return {
		error: null,
		res: { tovary, links },
	};
};
