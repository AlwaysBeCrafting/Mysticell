interface NavEndpoint {
	type: "end";
	id: string;
}

interface NavDirectory {
	type: "dir";
	name: string;
}

type NavItem =
	| NavDirectory
	| NavEndpoint;


export {NavItem};
