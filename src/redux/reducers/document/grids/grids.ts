import { Grid } from "data";

import * as grids from "redux/actions/document/grids";

type GridMap = Map<number, Grid>;

export const reducer = ( state = new Map(), action: grids.Actions ): GridMap => state;
