import { transformTovar } from '../transformers';

export const getTovar = async (tovarId) =>
	fetch(`http://localhost:3005/tovary/${tovarId}`)
		.then((res) => {
			if (res.ok) {
				return res;
			}

			const error = res.status === 404 ? 'Такая страница не существует' : 'Что-то пошло не так. Попробуйте ещё раз позднее';

			return Promise.reject(error);
		})
		.then((loadedTovar) => loadedTovar.json())
		.then((loadedTovar) => loadedTovar && transformTovar(loadedTovar));
