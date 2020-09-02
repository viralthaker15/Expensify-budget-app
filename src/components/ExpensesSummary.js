import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import selectExpenses from "../selectors/expenses";
import totalExpenses from "../selectors/expenses-total";
import numeral from "numeral";

//formatting numeral to Rs
numeral.register("locale", "Rs", {
	delimiters: {
		thousands: ",",
		decimal: ".",
	},
	abbreviations: {
		thousand: "k",
		million: "m",
		billion: "b",
		trillion: "t",
	},
	ordinal: function (number) {
		return number === 1 ? "Rupee" : "Rupees";
	},
	currency: {
		symbol: "₹",
	},
});

numeral.locale("Rs");

const ExpenseSummary = ({ expensesCount, expensesTotal }) => {
	const expenseWord = expensesCount === 1 ? "expense" : "expenses";
	const formattedExpensesTotal = numeral(expensesTotal / 100).format("$0,0.00");

	return (
		<div className='page-header'>
			<div className='content-container'>
				<h1 className='page-header__title'>
					Viewing <span>{expensesCount}</span> {expenseWord} totalling :{" "}
					<span>{formattedExpensesTotal}</span>
				</h1>
				<div className='page-header__actions'>
					<Link to='/create' className='button'>
						Add Expense
					</Link>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = state => {
	const visibleExpenses = selectExpenses(state.expenses, state.filters);
	return {
		expensesCount: visibleExpenses.length,
		expensesTotal: totalExpenses(visibleExpenses),
	};
};

export default connect(mapStateToProps)(ExpenseSummary);
