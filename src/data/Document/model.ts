import { Id } from 'common/types';

import { Cell } from 'data/Cell/model';
import { Graph } from 'data/Graph/model';


export interface Document extends Id {
	title: string;

	cells: Map<number, Cell>;
	graph: Graph;
}

export default Document;
