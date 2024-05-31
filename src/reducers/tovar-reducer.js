import { ACTION_TYPE } from '../actions';

const initialTovarState = {
	id: '',
	title: '',
	imageUrl: '',
	content: '',
	price: '',
};

export const tovarReducer = (state = initialTovarState, action) => {
	const { type, payload } = action;
	switch (type) {
		case ACTION_TYPE.SET_TOVAR_DATA: {
			return {
				...state,
				...payload,
			};
		}
		default:
			return state;
	}
};
