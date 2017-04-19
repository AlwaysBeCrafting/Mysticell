import { Id, Position } from 'common/types';

import { Cell } from 'data/Cell/model';
import { Graph } from 'data/Graph/model';
import { Sheet } from 'data/Sheet/model';


export interface Document extends Id {
	title: string;

	cells: Map<string, Cell>;
	sheets: Map<string, Sheet>;
	graph: Graph;

	layout: Map<string, Position>;
}

export default Document;
