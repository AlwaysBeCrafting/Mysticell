import { makeError, Param } from './Param';


interface PrimitiveNodeDefinition {
	name: string;
	inputNames: string[];
	outputNames: string[];
	exec: ( ...params: Param[] ) => Param[];
}


export const add: PrimitiveNodeDefinition = {
	name: 'Add',
	inputNames: [ 'A', 'B' ],
	outputNames: [ 'Sum' ],
	exec: ( a: Param, b: Param ) => {
		if ( a.type === 'number' && b.type === 'number' ) {
			return [{ type: 'number', value: a.value + b.value }];
		}
		return [makeError( 'Both arguments to Add must be numbers' )];
	},
};


export const subtract: PrimitiveNodeDefinition = {
	name: 'Subtract',
	inputNames: [ 'A', 'B' ],
	outputNames: [ 'Difference' ],
	exec: ( a, b ) => {
		if ( a.type === 'number' && b.type === 'number' ) {
			return [{ type: 'number', value: a.value - b.value }];
		}
		return [makeError( 'Both arguments to Subtract must be numbers' )];
	},
};


export const multiply: PrimitiveNodeDefinition = {
	name: 'Multiply',
	inputNames: [ 'A', 'B' ],
	outputNames: [ 'Product' ],
	exec: ( a, b ) => {
		if ( a.type === 'number' && b.type === 'number' ) {
			return [{ type: 'number', value: a.value * b.value }];
		}
		return [makeError( 'Both arguments to Multiply must be numbers' )];
	},
};


export const divide: PrimitiveNodeDefinition = {
	name: 'Divide',
	inputNames: [ 'A', 'B' ],
	outputNames: [ 'Quotient' ],
	exec: ( a, b ) => {
		if ( a.type === 'number' && b.type === 'number' ) {
			return [{ type: 'number', value: a.value / b.value }];
		}
		return [makeError( 'Both arguments to Divide must be numbers' )];
	},
};


export default PrimitiveNodeDefinition;
