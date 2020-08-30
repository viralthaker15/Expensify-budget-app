import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import Header from "../components/Header";

export const PrivateRoute = ({
	isAuthenticated,
	component: Component,
	...rest
}) => (
	<Route
		{...rest}
		component={props =>
			isAuthenticated ? (
				<div>
					<Header />
					<Component {...props} />
				</div>
			) : (
				<Redirect to='/' />
			)
		}
	/>
);

const mapStatetoProps = state => ({
	isAuthenticated: !!state.auth.uid, // => we will get boolean instead of object of uid which can be id or undefined when unauthenticated
});

export default connect(mapStatetoProps)(PrivateRoute);
