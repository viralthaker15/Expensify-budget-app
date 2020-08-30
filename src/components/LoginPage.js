import React from "react";
import { connect } from "react-redux";
import { startLogin } from "../actions/auth";

const LoginPage = ({ startLogin }) => (
	<div>
		<button onClick={startLogin}>Login</button>
	</div>
);

const mapDispatchToProps = dispatch => ({
	startLogin: () => dispatch(startLogin()),
});

//so we wanna dispatch startLogin action we need dispatch so we connected
//disptach with props so we provide undefined in connect method because
//the first argument are for mapping states and second argument is for dispatch

export default connect(undefined, mapDispatchToProps)(LoginPage);
