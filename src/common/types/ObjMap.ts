interface ObjMap<T> {
	[id: string]: T;
}

interface IdMap<T extends {id: string}> extends ObjMap<T> {}


export { ObjMap, IdMap };
