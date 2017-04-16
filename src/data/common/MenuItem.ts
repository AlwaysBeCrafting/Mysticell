import { Id } from 'common/types';

export interface MenuItem extends Id {
	title: string;
	hint?: string;
	icon?: string;
	childItems?: MenuItem[];
}

export default MenuItem;
