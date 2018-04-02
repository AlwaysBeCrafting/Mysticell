import { Reducer } from "redux";

import { EntityState } from "./model";

const reducer: Reducer<EntityState> = (state = new EntityState()) => state;

export { reducer };
