//  =================== import ===============

import React from "react";
import ReactDOM from "react-dom";
import AppRouter from "./routers/AppRouter";
import configureStore from "./store/configureStore";
import { Provider } from "react-redux";
import { addExpense, removeExpense, editExpense } from "./actions/expenses";
import {
	setTextFilter,
	sortByAmount,
	sortByDate,
	setEndDate,
	setStartDate,
} from "./actions/filters";
import getVisibleExpenses from "./selectors/expenses";
import "normalize.css/normalize.css";
import "./styles/styles.scss";

//  ==================== CODE ================

const store = configureStore();

store.dispatch(
	addExpense({ description: "waterbill", amount: 100, createdAt: 2000 })
);

store.dispatch(
	addExpense({ description: "rent", amount: 19000, createdAt: 23000 })
);

store.dispatch(
	addExpense({ description: "gasbill", amount: 500, createdAt: 1000 })
);

const state = store.getState();
const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
console.log(visibleExpenses);

const jsx = (
	<Provider store={store}>
		<AppRouter />
	</Provider>
);
//Provider enables all other components to have access to the Redux Store

ReactDOM.render(jsx, document.getElementById("app"));
