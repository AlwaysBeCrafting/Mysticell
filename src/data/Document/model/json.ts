import { Position } from 'common/types';
import { dictToMap } from 'common/util';

import { Param, ParamSource } from 'data/common';

import { TreeItem } from 'data/Tree/model';

import { Document } from './Document';


interface DocumentJson {
	id: string;
	title: string;

	cells: { [id: string]: CellJson };
	sheets: { [id: string]: SheetJson };
	graphs: { [id: string]: GraphJson };
	nodes: { [id: string]: NodeJson };

	layout: { [id: string]: Position };

	tree: TreeItem[];
}


const documentJsonToState = ( document: DocumentJson ): Document => ({
	id: document.id,
	title: document.title,

	cells:  dictToMap( document.cells,  fillId ),
	sheets: dictToMap( document.sheets, fillId ),
	graphs: dictToMap( document.graphs, fillId ),
	nodes:  dictToMap( document.nodes,  fillId ),

	layout: dictToMap( document.layout, ( _, pos ) => pos ),

	tree: document.tree,
});


const fillId = <T extends object>( id: string, obj: T ): T & { id: string } => (
	Object.assign({ id }, obj )
);


interface CellJson {
	sheet: string;
	node: string;
	start: { x: number, y: number };
	end: { x: number, y: number };
	format?: {};
}


interface SheetJson {
	title: string;
	size: { width: number, height: number };
	cells: string[];
}


interface GraphJson {
	name: string;
	type: 'function' | 'input' | 'computed';
	inputNames: string[];
	outputNames: string[];
	nodes: string[]; // Node IDs
	outputs: ParamSource[];
}


interface NodeJson {
	definition: string;
	label: string;
	inputs: ParamSource[];
	outputs: Param[];
}


export { DocumentJson, documentJsonToState };
export default DocumentJson;
