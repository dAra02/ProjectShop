import { getTovar } from '../api';

export const fetchTovar = async (tovarId) => {
	const tovar = await getTovar(tovarId);

	return {
		error: null,
		res: tovar,
	};
};
