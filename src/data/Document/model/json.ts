import { Position } from 'common/types';
import { dictToMap } from 'common/util';

import { Cell } from 'data/Cell/model';
import { Node } from 'data/Node/model';
import { Sheet } from 'data/Sheet/model';

import { Document } from './Document';


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


type ConnectionJson = string | { parent: number } | { member: string, index: number };

interface GraphMemberJson {
	node: string;
	inputs: ConnectionJson;
}

interface NodeJson {
	name: string;
	type: 'group' | 'input' | 'computed';
	inputNames: string[];
	outputNames: string[];
	members: { [id: string]: GraphMemberJson };
	outputs: ConnectionJson[];
}

const nodeJsonToState = ( id: string, node: NodeJson ): Node => ({ id, ...node });


interface DocumentJson {
	id: string;
	title: string;

	cells: { [id: string]: CellJson };
	sheets: { [id: string]: SheetJson };
	nodes: { [id: string]: NodeJson };

	layout: { [id: string]: Position };
}


const documentJsonToState = ( document: DocumentJson ): Document => ({
	id: document.id,
	title: document.title,

	cells: dictToMap( document.cells, cellJsonToState ),
	sheets: dictToMap( document.sheets, sheetJsonToState ),
	nodes: dictToMap( document.nodes, nodeJsonToState ),

	layout: dictToMap( document.layout, ( _, pos ) => pos ),
});


export { DocumentJson, documentJsonToState };
export default DocumentJson;
