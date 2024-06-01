export const setTovarCategor = (tovarId, categorId) =>
	fetch(`http://localhost:3005/tovary/${tovarId}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},

		body: JSON.stringify({
			categor_id: categorId,
		}),
	});
