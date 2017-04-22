import { Position } from 'common/types';
import { dictToMap } from 'common/util';

import { Param, ParamSource } from 'data/common';

import { Cell } from 'data/Cell/model';
import { Graph } from 'data/Graph/model';
import { Node } from 'data/Node/model';
import { Sheet } from 'data/Sheet/model';

import { Document } from './Document';


interface DocumentJson {
	id: string;
	title: string;

	cells: { [id: string]: CellJson };
	sheets: { [id: string]: SheetJson };
	graphs: { [id: string]: GraphJson };
	nodes: { [id: string]: NodeJson };

	layout: { [id: string]: Position };
}


const documentJsonToState = ( document: DocumentJson ): Document => ({
	id: document.id,
	title: document.title,

	cells:  dictToMap( document.cells,  cellJsonToState  ),
	sheets: dictToMap( document.sheets, sheetJsonToState ),
	graphs: dictToMap( document.graphs, graphJsonToState ),
	nodes:  dictToMap( document.nodes,  nodeJsonToState  ),

	layout: dictToMap( document.layout, ( _, pos ) => pos ),
});


interface CellJson {
	sheet: string;
	node: string;
	start: { x: number, y: number };
	end: { x: number, y: number };
	format?: {};
}

const cellJsonToState = ( id: string, cell: CellJson ): Cell => ({ id, ...cell });


interface SheetJson {
	title: string;
	size: { width: number, height: number };
	cells: string[];
}

const sheetJsonToState = ( id: string, sheet: SheetJson ): Sheet => ({ id, ...sheet });


interface GraphJson {
	name: string;
	type: 'function' | 'input' | 'computed';
	inputNames: string[];
	outputNames: string[];
	nodes: string[]; // Node IDs
	outputs: ParamSource[];
}

const graphJsonToState = ( id: string, graph: GraphJson ): Graph => ({ id, ...graph });


interface NodeJson {
	definition: string;
	label: string;
	inputs: ParamSource[];
	outputs: Param[];
}

const nodeJsonToState = ( id: string, node: NodeJson ): Node => ({ id, ...node });



export { DocumentJson, documentJsonToState };
export default DocumentJson;
