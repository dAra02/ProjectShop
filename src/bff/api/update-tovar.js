export const updateTovar = ({ id, imageUrl, price, title, content, selectedCategorId }) =>
	fetch(`http://localhost:3005/tovary/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},

		body: JSON.stringify({
			image_url: imageUrl,
			price,
			title,
			content,
			categor_id: selectedCategorId,
		}),
	}).then((loadedTovar) => loadedTovar.json());
