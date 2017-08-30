import { Action, ActionTypes } from './actions';
import { TreeItem } from './model';


const reducer = ( state: TreeItem[], action: Action ): TreeItem[] => {
	switch ( action.type ) {
		case ActionTypes.EXPAND_ITEM: {
			return state;
		}
		case ActionTypes.COLLAPSE_ITEM: {
			return state;
		}
		default: return state;
	}
};


export { reducer };
