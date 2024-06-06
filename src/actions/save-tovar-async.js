import { setTovarData } from './set-tovar-data';

export const saveTovarAsync = (requestServer, newTovarData) => (dispatch) =>
	requestServer('saveTovar', newTovarData).then((updatedTovar) => {
		dispatch(setTovarData(updatedTovar.res));

		return updatedTovar.res;
	});
