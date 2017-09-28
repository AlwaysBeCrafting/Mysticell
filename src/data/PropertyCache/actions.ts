import {Param, TypedAction} from "data/common";


const enum ActionTypes {
	UPDATE_OUTPUT_VALUES = "[PropertyCache] Update output values",
}
type Action =
	| UpdateOutputValuesAction;

interface UpdateOutputValuesAction extends TypedAction<ActionTypes.UPDATE_OUTPUT_VALUES> {
	payload: {nodeId: string, outputValues: Param[]};
}
const updateOutputValues = (nodeId: string, outputValues: Param[]): Action => ({
	type: ActionTypes.UPDATE_OUTPUT_VALUES,
	payload: {nodeId, outputValues},
});


export {Action, ActionTypes};
export {updateOutputValues};
