import { ErrorParam, Param } from 'data/common';
import { Primitive } from 'data/Node/model';


export const makeError = ( message ): ErrorParam => ({
	type: 'error',
	value: 'ERR',
	message,
});


export const add: Primitive = {
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


export const subtract: Primitive = {
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


export const multiply: Primitive = {
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


export const divide: Primitive = {
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
