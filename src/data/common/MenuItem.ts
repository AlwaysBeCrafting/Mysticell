export interface MenuItem {
	id: number;
	title: string;
	hint?: string;
	icon?: string;
	childItems?: MenuItem[];
}

export default MenuItem;
