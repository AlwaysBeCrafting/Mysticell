import {Dict, Tree} from "common/types";

import {Cell} from "data/Cell/model";
import {Formula} from "data/Formula/model";
import {NavItem} from "data/Nav";
import {Node} from "data/Node/model";
import {Sheet} from "data/Sheet/model";


interface Document {
	id: string;
	title: string;
	cells: Dict<Cell>;
	sheets: Dict<Sheet>;
	nodes: Dict<Node>;
	formulas: Dict<Formula>;
	nav: Tree<NavItem>;
}


export {Document};
