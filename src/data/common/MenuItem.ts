interface MenuItem {
	id: string;
	title: string;
	hint?: string;
	icon?: string;
	childItems?: MenuItem[];
	render?: (item: MenuItem) => JSX.Element;
}


export {MenuItem};
