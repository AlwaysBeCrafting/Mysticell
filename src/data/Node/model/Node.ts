import { Id } from 'common/types';

import { Param } from './Param';


export interface Node extends Id {
	name: string;
	inputNames: string[];
	outputNames: string[];
	exec: ( ...params: Param[] ) => Param[];
}

export default Node;
