import {Dict, Tree} from "common/types";

import {Cell} from "data/Cell/model";
import {Formula} from "data/Formula/model";
import {Node} from "data/Node/model";
import {Sheet} from "data/Sheet/model";
import {SidebarNode} from "data/SidebarNode";


interface Document {
	id: string;
	title: string;
	cells: Dict<Cell>;
	sheets: Dict<Sheet>;
	nodes: Dict<Node>;
	formulas: Dict<Formula>;
	tree: Tree<SidebarNode>;
}


export {Document};
