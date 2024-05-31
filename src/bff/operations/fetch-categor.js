import { getCategor } from '../api';
import { sessions } from '../sessions';
import { ROLE } from '../constants';

export const fetchCategor = async (hash) => {
	const accessRoles = [ROLE.ADMIN];

	const access = await sessions.access(hash, accessRoles);
	if (!access) {
		return {
			error: 'Доступ запрещён',
			res: null,
		};
	}

	const categor = await getCategor();

	return {
		error: null,
		res: categor,
	};
};
