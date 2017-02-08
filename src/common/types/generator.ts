import { Node } from "common/types";
import { Fxn } from "common/types/fxn";


const createId = (): number => Math.floor( Math.random() * 1000000 );


export const createNode = ( fieldId: number, fxn: Fxn ): Node => ({
	fxn,
	id:          createId(),
	inputNodes:  [],
	label:       fxn.name,
	position:    { x: 0, y: 0 },
	inputValues: [],
	outputValue: 0,
});
