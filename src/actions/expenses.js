import { v4 as uuid } from "uuid";
import database from "../firebase/firebase";

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

export const editExpense = (id, updates) => ({
	type: "EDIT_EXPENSE",
	id,
	updates,
});

export const removeExpense = ({ id } = {}) => ({
	type: "REMOVE_EXPENSE",
	id,
});
