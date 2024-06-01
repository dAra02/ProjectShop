import { addTovar, updateTovar } from '../api';
import { sessions } from '../sessions';
import { ROLE } from '../constants';

export const saveTovar = async (hash, newTovarData) => {
	const accessRoles = [ROLE.ADMIN];

	const access = await sessions.access(hash, accessRoles);
	if (!access) {
		return {
			error: 'Доступ запрещён',
			res: null,
		};
	}

	const savedTovar = newTovarData.id === '' ? await addTovar(newTovarData) : await updateTovar(newTovarData);

	return {
		error: null,
		res: savedTovar,
	};
};
