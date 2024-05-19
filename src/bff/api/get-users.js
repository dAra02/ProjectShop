export const getUsers = () => fetch(`http://localhost:3005/users`).then((loadedUser) => loadedUser.json());
