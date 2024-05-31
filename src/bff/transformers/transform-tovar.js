export const transformTovar = (dbTovar) => ({
	id: dbTovar.id,
	title: dbTovar.title,
	imageUrl: dbTovar.image_url,
	price: dbTovar.price,
	categorId: dbTovar.categor_id,
});
