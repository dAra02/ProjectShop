import { setTovarData } from './set-tovar-data';

export const loadTovarAsync = (requestServer, tovarId) => (dispatch) =>
	requestServer('fetchTovar', tovarId).then((tovarData) => {
		if (tovarData.res) {
			dispatch(setTovarData(tovarData.res));
		}

		return tovarData;
	});
