import { getCategor } from '../api';

export const fetchCategor = async () => {
	const categor = await getCategor();

	return {
		error: null,
		res: categor,
	};
};
