export const deleteTovar = (tovarId) =>
	fetch(`http://localhost:3005/tovary/${tovarId}`, {
		method: 'DELETE',
	});
