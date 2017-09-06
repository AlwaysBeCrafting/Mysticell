import {Param} from "data/common";


namespace ActionTypes {
	export const UPDATE_OUTPUT_VALUES = "[PropertyCache] Update output values";
}
type Action =
	| UpdateOutputValuesAction;

interface UpdateOutputValuesAction {
	readonly type: typeof ActionTypes.UPDATE_OUTPUT_VALUES;
	payload: {nodeId: string, outputValues: Param[]};
}
const updateOutputValues = (nodeId: string, outputValues: Param[]) => ({
	type: ActionTypes.UPDATE_OUTPUT_VALUES,
	payload: {nodeId, outputValues},
});


export {Action, ActionTypes};
export {updateOutputValues};
