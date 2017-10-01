import { Rect2d, Size2d } from "common/types";


interface Sheet {
	id: string;
	title: string;
	size: Size2d;
	layout: {[cellId: string]: Rect2d};
}


export { Sheet };
