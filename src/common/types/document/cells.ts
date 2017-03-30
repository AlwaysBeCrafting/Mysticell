import { Id } from "common/types/id";
import { Position } from "common/types/layout";


export interface CellFormat {

}

export interface Cell extends Id {
	sheet: number;
	node: number;
	start: Position;
	end: Position;
	format?: CellFormat;
}
