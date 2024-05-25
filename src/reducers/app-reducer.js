import { ACTION_TYPE } from '../actions';

const initialAppState = {
	wasLogout: false,
};

export const appReducer = (state = initialAppState, action) => {
	const { type } = action;
	switch (type) {
		case ACTION_TYPE.LOGOUT: {
			return {
				...state,
				wasLogout: !state.wasLogout,
			};
		}

		default:
			return state;
	}
};
