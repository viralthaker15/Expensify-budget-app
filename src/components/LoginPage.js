import React from "react";
import { connect } from "react-redux";
import { startLogin } from "../actions/auth";

const LoginPage = ({ startLogin }) => (
	<div
		className='box-layout
	'>
		<div className='box-layout__box'>
			<h1 className='box-layout__title'>Expensify</h1>
			<p>It's time to get your expenses under control</p>
			<button className='button' onClick={startLogin}>
				Login with Google
			</button>
		</div>
	</div>
);

const mapDispatchToProps = dispatch => ({
	startLogin: () => dispatch(startLogin()),
});

//so we wanna dispatch startLogin action we need dispatch so we connected
//disptach with props so we provide undefined in connect method because
//the first argument are for mapping states and second argument is for dispatch

export default connect(undefined, mapDispatchToProps)(LoginPage);
