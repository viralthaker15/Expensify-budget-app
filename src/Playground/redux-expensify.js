import { createStore, combineReducers } from "redux";
import { v4 as uuid } from "uuid";

//functions which goes as inputs in dispatch
//action generator functions
const addExpense = ({
	description = "",
	note = "",
	amount = 0,
	createdAt = 0,
} = {}) => ({
	type: "ADD_EXPENSE",
	expense: {
		id: uuid(),
		description,
		note,
		amount,
		createdAt,
	},
});

const editExpense = (id, updates) => ({
	type: "EDIT_EXPENSE",
	id,
	updates,
});

const removeExpense = ({ id } = {}) => ({
	type: "REMOVE_EXPENSE",
	id,
});
const setTextFilter = (text = "") => ({
	type: "SET_TEXT_FILTER",
	text,
});

const sortByDate = () => ({
	type: "SORT_BY_DATE",
});

const sortByAmount = () => ({
	type: "SORT_BY_AMOUNT",
});

const setStartDate = (startDate = undefined) => ({
	type: "SET_START_DATE",
	startDate,
});

const setEndDate = (endDate = undefined) => ({
	type: "SET_END_DATE",
	endDate,
});

//Reducer default objects states

const expenseReducerDefaultState = [];
const filtersReducerDefaultState = {
	text: "",
	sortBy: "date",
	startDate: undefined,
	endDate: undefined,
};

//Reducer funtions

const expenseReducer = (state = expenseReducerDefaultState, action) => {
	switch (action.type) {
		case "ADD_EXPENSE":
			return [...state, action.expense];

		case "REMOVE_EXPENSE":
			return state.filter(({ id }) => id !== action.id);

		case "EDIT_EXPENSE":
			return state.map(expense => {
				if (expense.id === action.id) {
					return {
						...expense,
						...action.updates,
					};
				} else return expense;
			});
		default:
			return state;
	}
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
	switch (action.type) {
		case "SET_TEXT_FILTER":
			return {
				...state,
				text: action.text,
			};

		case "SORT_BY_DATE":
			return {
				...state,
				sortBy: "date",
			};

		case "SORT_BY_AMOUNT":
			return {
				...state,
				sortBy: "amount",
			};

		case "SET_START_DATE":
			return {
				...state,
				startDate: action.startDate,
			};

		case "SET_END_DATE":
			return {
				...state,
				endDate: action.endDate,
			};

		default:
			return state;
	}
};

//Get visible expenses - expenses , filters are inputs
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
	return expenses
		.filter(expense => {
			const startDateMatch =
				typeof startDate !== "number" || expense.createdAt >= startDate;
			const endDateMatch =
				typeof endDate !== "number" || expense.createdAt <= endDate;
			const textMatch = expense.description
				.toLowerCase()
				.includes(text.toLowerCase());

			return startDateMatch && endDateMatch && textMatch;
		})
		.sort((a, b) => {
			if (sortBy === "date") {
				return a.createdAt < b.createdAt ? 1 : -1;
			} else if (sortBy === "amount") {
				return a.amount < b.amount ? 1 : -1;
			}
		});
};
// Store creation

const store = createStore(
	combineReducers({
		expenses: expenseReducer,
		filters: filtersReducer,
	})
);

store.subscribe(() => {
	const state = store.getState();
	const visiibleExpenses = getVisibleExpenses(state.expenses, state.filters);
	console.log(visiibleExpenses);
});

//dispatchers
//dispatcher takes input of functions and updates the state

const expenseOne = store.dispatch(
	addExpense({ description: "rent", amount: 100, createdAt: -1000 })
);

const expenseTwo = store.dispatch(
	addExpense({ description: "coffee", amount: 500, createdAt: 1000 })
);

// store.dispatch(removeExpense({ id: expenseOne.expense.id }));
// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 1000 }));
//store.dispatch(setTextFilter("Rent"));
// store.dispatch(setTextFilter(""));
// store.dispatch(sortByDate());
// store.dispatch(sortByAmount());

//store.dispatch(setStartDate(125));
// store.dispatch(setStartDate());
//store.dispatch(setEndDate(500));
// store.dispatch(setEndDate());

//console.log(expenseOne);
//console.log(store.getState());

// const demoState = {
// 	expenses: [
// 		{
// 			id: "123213123",
// 			description: "Job rent",
// 			note: "find a job to pay rent",
// 			amount: "5000",
// 			createdAt: 0,
// 		},
// 	],

// 	filters: {
// 		text: "rent",
// 		sortBy: "amount",
// 		startDate: undefined,
// 		endDate: undefined,
// 	},
// };
