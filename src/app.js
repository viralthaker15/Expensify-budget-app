//  =================== import ===============

import React from "react";
import ReactDOM from "react-dom";
import AppRouter, { history } from "./routers/AppRouter";
import configureStore from "./store/configureStore";
import { Provider } from "react-redux";
import { startSetExpenses } from "./actions/expenses";
import "normalize.css/normalize.css";
import "./styles/styles.scss";
import { firebase } from "./firebase/firebase.js";
import { login, logout } from "./actions/auth";

//  ==================== CODE ================

const store = configureStore();

const jsx = (
	<Provider store={store}>
		<AppRouter />
	</Provider>
);

let hasRendered = false;

const renderApp = () => {
	if (!hasRendered) {
		ReactDOM.render(jsx, document.getElementById("app"));
		hasRendered = true;
	}
};

//Provider enables all other components to have access to the Redux Store
ReactDOM.render(<p>Loading ....</p>, document.getElementById("app"));

firebase.auth().onAuthStateChanged(user => {
	if (user) {
		store.dispatch(login(user.uid));
		store.dispatch(startSetExpenses()).then(() => {
			renderApp();

			if (history.location.pathname === "/") {
				history.push("/dashboard");
			}
		});
	} else {
		store.dispatch(logout());
		renderApp();
		history.push("/");
	}
});
