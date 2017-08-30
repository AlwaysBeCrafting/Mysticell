interface ObjMap<T> {
	[id: string]: T;
}

type IdMap<T extends {id: string}> = ObjMap<T>;


export { ObjMap, IdMap };
