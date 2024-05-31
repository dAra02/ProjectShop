import { setTovarData } from './set-tovar-data';

export const loadTovarAsync = (requestServer, tovarId) => (dispatch) => {
	requestServer('fetchTovar', tovarId).then((tovarData) => {
		dispatch(setTovarData(tovarData.res));
	});
};
