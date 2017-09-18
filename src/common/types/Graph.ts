interface DiEdge<N, D> {
	source: N;
	target: N;
	data: D;
}

type DiGraph<N, D = void> = Array<DiEdge<N, D>>;


export {DiEdge, DiGraph};
