import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import { userReducer, tovarReducer, tovaryReducer, appReducer } from './reducers';

const reducer = combineReducers({
	app: appReducer,
	user: userReducer,
	tovary: tovaryReducer,
	tovar: tovarReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
