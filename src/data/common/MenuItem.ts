export interface MenuItem {
	id: string;
	title: string;
	hint?: string;
	icon?: string;
	childItems?: MenuItem[];
	render?: (MenuItem) => JSX.Element;
}

export default MenuItem;
