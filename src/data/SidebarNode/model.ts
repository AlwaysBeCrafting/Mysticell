interface SidebarItem {
	type: "item";
	id: string;
}

interface SidebarDir {
	type: "dir";
	name: string;
}

type SidebarNode = SidebarItem | SidebarDir;


export {SidebarNode};
