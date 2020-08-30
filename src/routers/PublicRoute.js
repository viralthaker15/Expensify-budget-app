import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

export const PublicRoute = ({
	isAuthenticated,
	component: Component,
	...rest
}) => (
	<Route
		{...rest}
		component={props =>
			isAuthenticated ? <Redirect to='/dashboard' /> : <Component {...props} />
		}
	/>
);

const mapStatetoProps = state => ({
	isAuthenticated: !!state.auth.uid, // => we will get boolean instead of object of uid which can be id or undefined when unauthenticated
});

export default connect(mapStatetoProps)(PublicRoute);
