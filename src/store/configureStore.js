// ========================== IMPORT ===========================

import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import expenseReducer from "../reducers/expenses";
import filtersReducer from "../reducers/filters";
import thunk from "redux-thunk";

//==================== CODE ====================================

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
	//store creation
	const store = createStore(
		combineReducers({
			expenses: expenseReducer,
			filters: filtersReducer,
		}),
		composeEnhancers(applyMiddleware(thunk)) //redux dev tools
	);

	return store;
};
