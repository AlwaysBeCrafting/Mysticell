import { combineReducers } from "redux";

import { Action } from "redux/actions";
import { AppState } from "redux/state";

import { reducer as reduceTitle         } from "redux/reducers/title";
import { reducer as reduceFields        } from "redux/reducers/fields";
import { reducer as reduceNodes         } from "redux/reducers/nodes";
import { reducer as reducePath          } from "redux/reducers/path";
import { reducer as reduceCards         } from "redux/reducers/cards";
import { reducer as reduceSheets        } from "redux/reducers/sheets";
import { reducer as reduceCells         } from "redux/reducers/cells";
import { reducer as reducePopup         } from "redux/reducers/popup";
import { reducer as reduceSelectedNodes } from "redux/reducers/selectedNodes";

const initialState: AppState = {
	title: "Untitled Document",

	sheets: new Map(),
	cards: new Map(),
	cells: new Map(),

	fields: new Map(),
	nodes: new Map(),

	path: [],
	selectedNodes: [],
};

export const reducer = combineReducers({
	title:         reduceTitle,

	sheets:        reduceSheets,
	cards:         reduceCards,
	cells:         reduceCells,

	fields:        reduceFields,
	nodes:         reduceNodes,

	path:          reducePath,
	selectedNodes: reduceSelectedNodes,
	popup:         reducePopup,
});
