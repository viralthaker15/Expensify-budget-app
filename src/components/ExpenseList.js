import React from "react";
import { connect } from "react-redux";
import ExpenseListItem from "./ExpenseListItem";
import selectExpenses from "../selectors/expenses";

const ExpenseList = props => (
	<div className='content-container'>
		<div className='list-header'>
			<div className='show-for-mobile'>Expenses</div>
			<div className='show-for-desktop'>Expense</div>
			<div className='show-for-desktop'>Amount</div>
		</div>
		<div className='list-body'>
			{props.expenses.length === 0 ? (
				<div className='list-item list-item--message'>
					<span>No expenses</span>
				</div>
			) : (
				props.expenses.map(expense => {
					return <ExpenseListItem key={expense.id} {...expense} />;
				})
			)}
		</div>
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
