export interface Position {
	x: number;
	y: number;
}

export interface Id {
	id: number;
}

export interface Parent<T> {
	children: T[];
}
