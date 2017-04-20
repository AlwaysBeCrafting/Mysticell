import { Id } from 'common/types';


export interface Sheet extends Id {
	title: string;
	size: { width: number, height: number };
}

export default Sheet;
