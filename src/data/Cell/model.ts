interface Format {}

interface Cell {
	id: string;
	property: string;
	format?: Format;
}


export { Cell };
