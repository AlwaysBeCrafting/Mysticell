import { makeErrorParam, Param } from 'data/common';
import { Primitive } from 'data/Node/model';


export const add: Primitive = {
	name: 'Add',
	inputNames: [ 'A', 'B' ],
	outputNames: [ 'Sum' ],
	exec: ( a: Param, b: Param ) => {
		if ( a.type === 'number' && b.type === 'number' ) {
			return [{ type: 'number', value: a.value + b.value }];
		}
		return [makeErrorParam( 'Both arguments to Add must be numbers' )];
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
		return [makeErrorParam( 'Both arguments to Subtract must be numbers' )];
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
		return [makeErrorParam( 'Both arguments to Multiply must be numbers' )];
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
		return [makeErrorParam( 'Both arguments to Divide must be numbers' )];
	},
};


export const floor: Primitive = {
	name: 'Floor',
	inputNames: [ 'Num' ],
	outputNames: [ 'Floor' ],
	exec: ( a ) => {
		if ( a.type === 'number' ) {
			return [{ type: 'number', value: Math.floor( a.value ) }];
		}
		return [makeErrorParam( 'Argument to Floor must be a number' )];
	},
};
