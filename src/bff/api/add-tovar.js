export const addTovar = ({ imageUrl, title, content, price, selectedCategorId }) =>
	fetch('http://localhost:3005/tovary', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},

		body: JSON.stringify({
			image_url: imageUrl,
			title,
			content,
			price,
			categor_id: selectedCategorId,
		}),
	}).then((createdTovar) => createdTovar.json());
