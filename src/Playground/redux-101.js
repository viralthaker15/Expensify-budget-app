import { createStore } from "redux";

// Action generators
const increamentCount = ({ increamentBy = 1 } = {}) => ({
	type: "INCREAMENT",
	increamentBy,
});

const decrementCount = ({ decrementBy = 1 } = {}) => ({
	type: "DECREMENT",
	decrementBy,
});

const setCount = ({ count }) => ({
	type: "SET",
	count,
});

const resetCount = () => ({
	type: "RESET",
});

//Reducers -  which determines what to do when certain actions do happen it is a pure function

const countReducer = (state = { count: 0 }, action) => {
	switch (action.type) {
		case "INCREAMENT":
			return { count: state.count + action.increamentBy };

		case "DECREMENT":
			return { count: state.count - action.decrementBy };

		case "SET":
			return { count: action.count };

		case "RESET":
			return { count: 0 };

		default:
			return state;
	}
};

const store = createStore(countReducer);

const unsubscribe = store.subscribe(() => {
	console.log(store.getState());
});

store.dispatch(increamentCount({ increamentBy: 5 }));
store.dispatch(decrementCount({ decrementBy: 5 }));
store.dispatch(decrementCount());
store.dispatch(increamentCount());
store.dispatch(setCount({ count: 101 }));
store.dispatch(resetCount());
