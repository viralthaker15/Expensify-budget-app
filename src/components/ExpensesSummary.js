import React from "react";
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
		<div>
			<h1>
				Viewing {expensesCount} {expenseWord} totalling :{" "}
				{formattedExpensesTotal}
			</h1>
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
