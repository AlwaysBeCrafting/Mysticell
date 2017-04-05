import { Id } from 'common/types';


export interface Sheet extends Id {
	title: string;
	width: number;
	height: number;
}

export default Sheet;
