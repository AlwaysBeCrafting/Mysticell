interface Cell {
	id: string;
	property: {
		id: string;
		type: "input" | "output";
		index: number;
	};
	format?: {};
}


export { Cell };
