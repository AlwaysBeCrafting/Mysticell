import Action from './actions';
import { TreeItem } from './model';



export default ( state: TreeItem[], action: Action ): TreeItem[] => {
	switch ( action.type ) {
		default:
			return state;
	}
};
