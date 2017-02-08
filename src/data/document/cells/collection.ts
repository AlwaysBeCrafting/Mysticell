import { Cell } from "common/types";
import { combineReducers } from "redux";


class ActionTypes {}


export type Action = never;


type CellMap = Map<number, Cell>;

export default ( state = new Map(), action: Action ): CellMap => state;
