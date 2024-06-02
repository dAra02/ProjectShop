import { ROLE } from '../constants';
import { getTovary } from '../api';
import { sessions } from '../sessions';

export const fetchTovaryAdmin = async (hash) => {
	const accessRoles = [ROLE.ADMIN];

	const access = await sessions.access(hash, accessRoles);

	if (!access) {
		return {
			error: 'Доступ запрещён',
			res: null,
		};
	}

	const { tovary } = await getTovary();

	return {
		error: null,
		res: tovary,
	};
};
