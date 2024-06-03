import { getTovary } from '../api';

export const fetchTovary = async (seatchPhrase, page, limit, sort, idCategor) => {
	const { tovary, links } = await getTovary(seatchPhrase, page, limit, sort, idCategor);

	return {
		error: null,
		res: { tovary, links },
	};
};
