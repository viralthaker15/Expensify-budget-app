import React from "react";
import { connect } from "react-redux";
import ExpenseForm from "./ExpenseForm";
import { startAddExpense } from "../actions/expenses";

const AddExpensePage = props => (
	<div>
		<div className='page-header'>
			<div className='content-container'>
				<h1 className='page-header__title'>Add Expense</h1>
			</div>
		</div>
		<div className='content-container'>
			<ExpenseForm
				onSubmit={expense => {
					props.dispatch(startAddExpense(expense));
					props.history.push("/");
				}} //this onSubmit function gets called in expenseforms
			/>
		</div>
	</div>
);

export default connect()(AddExpensePage);
