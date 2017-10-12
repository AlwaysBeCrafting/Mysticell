import { Dict, Rect2d, Size2d } from "common/types";

import { Cell } from "data/Cell";


interface Sheet {
	id: string;
	title: string;
	size: Size2d;
	cells: Dict<Cell>;
	layout: {[cellId: string]: Rect2d};
}


export { Sheet };
