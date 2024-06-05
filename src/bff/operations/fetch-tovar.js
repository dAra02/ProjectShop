import { getTovar } from '../api';

export const fetchTovar = async (tovarId) => {
	let tovar;
	let error;

	try {
		tovar = await getTovar(tovarId);
	} catch (postError) {
		error = postError;
	}

	if (error) {
		return {
			error,
			res: null,
		};
	}

	return {
		error: null,
		res: tovar,
	};
};
