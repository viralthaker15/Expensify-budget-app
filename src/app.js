//  =================== import ===============

import React from "react";
import ReactDOM from "react-dom";
import AppRouter from "./routers/AppRouter";
import configureStore from "./store/configureStore";
import { Provider } from "react-redux";
import { startSetExpenses } from "./actions/expenses";
import "normalize.css/normalize.css";
import "./styles/styles.scss";
import "./firebase/firebase.js";

//  ==================== CODE ================

const store = configureStore();

const jsx = (
	<Provider store={store}>
		<AppRouter />
	</Provider>
);

//Provider enables all other components to have access to the Redux Store
ReactDOM.render(<p>Loading ....</p>, document.getElementById("app"));

store.dispatch(startSetExpenses()).then(() => {
	ReactDOM.render(jsx, document.getElementById("app"));
});
