import {IdMap, Tree} from "common/types";

import {Cell} from "data/Cell/model";
import {Formula} from "data/Formula/model";
import {Node} from "data/Node/model";
import {Sheet} from "data/Sheet/model";


interface Document {
	id: string;
	title: string;
	cells: IdMap<Cell>;
	sheets: IdMap<Sheet>;
	nodes: IdMap<Node>;
	formulas: IdMap<Formula>;
	tree: Tree<Formula>;
}


export {Document};
