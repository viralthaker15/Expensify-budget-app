export default expenses => {
	return expenses
		.map(expense => expense.amount)
		.reduce((sum, expvalue) => sum + expvalue, 0);
};
