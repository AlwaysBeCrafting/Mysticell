const patchArray = <A, B>(a: A[], b: B[]): Array<A | B> => (
	b.reduce((prior: Array<A | B>, value, i) => {
			prior[i] = value;
			return prior;
		},
		[...a],
	)
);


export { patchArray };
