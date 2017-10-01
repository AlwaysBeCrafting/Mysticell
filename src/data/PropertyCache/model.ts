import { Dict } from "common/types";

import { Param } from "data/common";


interface CacheEntry {
	outputValues: Param[];
}

type PropertyCache = Dict<CacheEntry>;


export { PropertyCache };
