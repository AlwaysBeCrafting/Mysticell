interface MenuItem {
	title: string;
	hint?: string;
	icon?: string;
	children?: MenuItem[];
}

export default MenuItem;
