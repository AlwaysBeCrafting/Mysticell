import { Id } from 'common/types';

import { Graph } from 'data/Graph/model';
import { Cell } from 'data/Cell/model';


export interface Document extends Id {
	title: string;

	cells: Map<number, Cell>;
	graph: Graph;
}

export default Document;
