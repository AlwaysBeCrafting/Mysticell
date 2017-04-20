import { Id, Position } from 'common/types';


export interface Format {}


export interface Cell extends Id {
	sheet: string;
	node: string;
	start: Position;
	end: Position;
	format?: Format;
}

export default Cell;
