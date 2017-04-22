import { Id, Position } from 'common/types';

import { Cell } from 'data/Cell/model';
import { Graph } from 'data/Graph/model';
import { Node } from 'data/Node/model';
import { Sheet } from 'data/Sheet/model';


export interface Document extends Id {
	title: string;

	cells: Map<string, Cell>;
	sheets: Map<string, Sheet>;
	graphs: Map<string, Graph>;
	nodes: Map<string, Node>;

	layout: Map<string, Position>;
}

export default Document;
