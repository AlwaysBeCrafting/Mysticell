import { Dict } from "common/types";

import { Cell } from "data/Cell";
import { Formula } from "data/Formula";
import { Nav } from "data/Nav";
import { Node } from "data/Node";
import { PropertyInputs } from "data/PropertyInputs";
import { Sheet } from "data/Sheet";


interface Document {
	id: string;
	title: string;
	cells: Dict<Cell>;
	sheets: Dict<Sheet>;
	nodes: Dict<Node>;
	formulas: Dict<Formula>;
	propertyInputs: PropertyInputs;
	nav: Nav;
}


export { Document };
