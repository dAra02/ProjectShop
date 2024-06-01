import { setTovarCategor } from '../api';
import { sessions } from '../sessions';
import { ROLE } from '../constants';

export const updateTovarCategor = async (hash, { id, selectedCategorId }) => {
	const accessRoles = [ROLE.ADMIN];

	const access = await sessions.access(hash, accessRoles);
	if (!access) {
		return {
			error: 'Доступ запрещён',
			res: null,
		};
	}

	setTovarCategor(id, selectedCategorId);

	return {
		error: null,
		res: true,
	};
};
