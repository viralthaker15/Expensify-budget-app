// ========================== IMPORT ===========================

import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import expenseReducer from "../reducers/expenses";
import filtersReducer from "../reducers/filters";
import authReducer from "../reducers/auth";

//==================== CODE ====================================

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //for redux dev tools

export default () => {
	//store creation
	const store = createStore(
		combineReducers({
			expenses: expenseReducer,
			filters: filtersReducer,
			auth: authReducer,
		}),
		composeEnhancers(applyMiddleware(thunk))
	);

	return store;
};

//Redux Thunk middleware allows you to write action creators that return a function instead of an action.
//The thunk can be used to delay the dispatch of an action, or to dispatch only if a certain condition is met.
//The inner function receives the store methods dispatch and getState as parameters.
