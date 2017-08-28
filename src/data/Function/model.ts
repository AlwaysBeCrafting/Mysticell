import { ObjMap } from 'common/types';

import { Param } from 'data/common';


interface ProtoFunction {
	id: string;
	title: string;
	inputNames: string[];
	outputNames: string[];
}

interface PrimitiveFunction extends ProtoFunction {
	type: 'primitive';
	eval: ( ...params: Param[] ) => Param[];
}

interface CustomFunction extends ProtoFunction {
	type: 'custom';
	isProperty: boolean;
	graph: ObjMap<ObjMap<Array<[number, number]>>>;
}

type Function = PrimitiveFunction | CustomFunction;


export { Function, CustomFunction, PrimitiveFunction };
