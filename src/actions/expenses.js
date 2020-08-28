import database from "../firebase/firebase";
import expenses from "../reducers/expenses";

//ADD EXPENSE
export const addExpense = expense => ({
	type: "ADD_EXPENSE",
	expense,
});

export const startAddExpense = (expenseData = {}) => {
	//this function returns a function which is used to dispatch the above action object
	return dispatch => {
		const {
			description = "",
			note = "",
			amount = 0,
			createdAt = 0,
		} = expenseData;
		//destructured the data which was passed to this function

		const expense = { description, note, amount, createdAt };

		database
			.ref("expenses")
			.push(expense)
			.then(ref => {
				dispatch(
					addExpense({
						id: ref.key,
						...expense,
					})
				);
			});
	};
};

//EDIT EXPENSE
export const editExpense = (id, updates) => ({
	type: "EDIT_EXPENSE",
	id,
	updates,
});

// SET EXPENSES
export const setExpenses = expenses => ({
	type: "SET_EXPENSES",
	expenses,
});

export const startSetExpenses = () => {
	return dispatch => {
		return database
			.ref("expenses")
			.once("value")
			.then(snapshot => {
				const expenses = [];

				snapshot.forEach(childSnapshot => {
					expenses.push({
						id: childSnapshot.key,
						...childSnapshot.val(),
					});
				}); // parsing the data came from firebase object => array

				dispatch(setExpenses(expenses));
			});
		//this promise returns a new promise
		//we need to "return" this promise to another promise
		//it creates promise chaining and we can use another then
		//in the app.js
	};
};

export const removeExpense = ({ id } = {}) => ({
	type: "REMOVE_EXPENSE",
	id,
});
