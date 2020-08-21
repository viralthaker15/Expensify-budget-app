import React from "react";
import { connect } from "react-redux";
import ExpenseListItem from "./ExpenseListItem";
import selectExpenses from "../selectors/expenses";

const ExpenseList = props => (
	<div>
		<h1>Expense List</h1>
		{props.expenses.map(expense => {
			return <ExpenseListItem key={expense.id} {...expense} />;
		})}
	</div>
);

const mapStateToProps = state => {
	return {
		expenses: selectExpenses(state.expenses, state.filters),
	};
};

export default connect(mapStateToProps)(ExpenseList);

//this method returns a new connected component that we passed in the args
//connect() => returns a new method in which we pass our
//component which we want to connect with redux store
//and that method returns a new connected component

// connect method returns a HOC component which takes ExpenseList comp.
// and returns a new connected ExpenseList component
