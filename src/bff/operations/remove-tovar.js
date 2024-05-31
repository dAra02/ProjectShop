import { deleteTovar } from '../api';
import { sessions } from '../sessions';
import { ROLE } from '../constants';

export const removeTovar = async (hash, tovarId) => {
	const accessRoles = [ROLE.ADMIN];

	const access = await sessions.access(hash, accessRoles);
	if (!access) {
		return {
			error: 'Доступ запрещён',
			res: null,
		};
	}

	deleteTovar(tovarId);

	return {
		error: null,
		res: true,
	};
};
