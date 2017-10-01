const formulaLayoutWidth = (layout: {[nodeId: string]: [number, number]}) => (
	Object.keys(layout)
		.map(key => layout[key])
		.reduce((max, current) => Math.max(current[0], max), 2)
		+ 6
);


export { formulaLayoutWidth };
