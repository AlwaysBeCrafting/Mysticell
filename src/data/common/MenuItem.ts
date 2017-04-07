export interface MenuItem {
	id: number;
	title: string;
	hint?: string;
	icon?: string;
	children?: MenuItem[];
}

export default MenuItem;
