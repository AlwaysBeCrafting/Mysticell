import { IdMap } from 'common/types';

import { Cell } from 'data/Cell/model';
import { Function } from 'data/Function/model';
import { Node } from 'data/Node/model';
import { Sheet } from 'data/Sheet/model';
import { TreeItem } from 'data/Tree/model';


interface Document {
	id: string;
	title: string;
	cells: IdMap<Cell>;
	sheets: IdMap<Sheet>;
	nodes: IdMap<Node>;
	functions: IdMap<Function>;
	tree: TreeItem[];
}


export { Document };
