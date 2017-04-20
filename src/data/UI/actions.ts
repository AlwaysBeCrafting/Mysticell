namespace ActionTypes {}


interface Action {
	type: string;
	payload: {};
}


export { Action, ActionTypes };
export default Action;
