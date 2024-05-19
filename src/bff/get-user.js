import { getUsers } from './api';

export const getUser = async (loginToFind) => {
	const users = await getUsers();

	return users.find(({ login }) => login === loginToFind);
};
