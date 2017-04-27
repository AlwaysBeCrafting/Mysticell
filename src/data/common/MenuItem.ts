import { Id } from 'common/types';

export interface MenuItem extends Id {
	title: string;
	hint?: string;
	icon?: string;
	childItems?: MenuItem[];
	render?: ( MenuItem ) => JSX.Element;
}

export default MenuItem;
