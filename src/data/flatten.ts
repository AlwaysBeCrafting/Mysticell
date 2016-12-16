import { RecursiveParent } from 'data/shared';

const flatten = <T extends RecursiveParent<T>>( parents: T[] ): T[] => {
	return parents.reduce(( acc, parent ) => [
		...acc,
		parent,
		...flatten( parent.children ),
	], [] as T[] );
};

export default flatten;
