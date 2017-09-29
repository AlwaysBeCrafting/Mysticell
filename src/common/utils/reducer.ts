import { Reducer } from "redux";


const composeReducers = <T>(...reducers: Array<Reducer<T>>): Reducer<T> => (
	(state: T, action: any) => (
		reducers.reverse().reduce(
			(prior: T, r: Reducer<T>) => r(prior, action),
			state,
		)
	)
);


export {composeReducers};
