import { Id } from 'common/types';


export interface Node extends Id {
	name: string;
	inputNames: string[];
	outputNames: string[];
}

export default Node;
