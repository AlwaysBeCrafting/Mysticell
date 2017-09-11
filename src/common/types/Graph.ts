interface DiEdge<N, E> {
	source: N;
	target: N;
	edge: E;
}

type DiGraph<N, E> = Array<DiEdge<N, E>>;


export {DiEdge, DiGraph};
