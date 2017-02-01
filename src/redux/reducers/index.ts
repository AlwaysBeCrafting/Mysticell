import { combineReducers } from "redux";

import { Action } from "redux/actions";
import { AppState } from "redux/state";

import { reducer as reduceDocument } from "redux/reducers/document";

import { reducer as reduceCells         } from "redux/reducers/cells";
import { reducer as reduceFields        } from "redux/reducers/fields";
import { reducer as reduceGrids         } from "redux/reducers/grids";
import { reducer as reduceNodes         } from "redux/reducers/nodes";
import { reducer as reducePath          } from "redux/reducers/path";
import { reducer as reducePopup         } from "redux/reducers/popup";
import { reducer as reduceSelectedNodes } from "redux/reducers/selectedNodes";
import { reducer as reduceTitle         } from "redux/reducers/title";

const reducerChain: Array<( AppState, Action ) => AppState> = [
	reduceDocument,
	combineReducers<AppState>({
		title:         reduceTitle,

		grids:         reduceGrids,
		cells:         reduceCells,

		fields:        reduceFields,
		nodes:         reduceNodes,

		path:          reducePath,
		selectedNodes: reduceSelectedNodes,
		popup:         reducePopup,
	}),
];

export const reducer = ( state: AppState, action: Action ) => reducerChain.reduce(
	( chainedState, chainedReducer ) =>  chainedReducer( chainedState, action ),
	state,
);
