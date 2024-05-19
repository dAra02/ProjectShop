import { Remove } from './session';
import { ROLE } from '../constants';

export const createSession = (roleId) => {
	const session = {
		logout() {
			Object.keys(session).forEach((key) => {
				delete session[key];
			});
		},
	};

	switch (roleId) {
		case ROLE.ADMIN: {
			session.remove = Remove;
			break;
		}
		case ROLE.USER: {
			break;
		}
		default:
		// ничего не делать
	}
	return session;
};
