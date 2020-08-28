import React from "react";
import { connect } from "react-redux";
import ExpenseForm from "./ExpenseForm";
import { startAddExpense } from "../actions/expenses";

const AddExpensePage = props => (
	<div>
		<h1>Add Expense</h1>
		<ExpenseForm
			onSubmit={expense => {
				props.dispatch(startAddExpense(expense));
				props.history.push("/");
			}} //this onSubmit function gets called in expenseforms
		/>
	</div>
);

export default connect()(AddExpensePage);
