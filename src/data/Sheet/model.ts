interface Sheet {
	id: string;
	title: string;
	size: [ number, number ];
	layout: {[ cellId: string ]: [ number, number, number, number ]};
}


export { Sheet };
