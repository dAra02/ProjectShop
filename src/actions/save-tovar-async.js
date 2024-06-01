import { setTovarData } from './set-tovar-data';

export const saveTovarAsync = (requestServer, newTovarData) => (dispatch) =>
	Promise.all([requestServer('saveTovar', newTovarData), requestServer('updateTovarCategor', newTovarData)]).then(([updatedTovar]) => {
		dispatch(setTovarData(updatedTovar.res));

		return updatedTovar.res;
	});
