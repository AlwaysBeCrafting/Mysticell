import {Size2d} from "common/types";


interface Sheet {
	id: string;
	title: string;
	size: Size2d;
	layout: {[cellId: string]: [number, number, number, number]};
}


export {Sheet};
