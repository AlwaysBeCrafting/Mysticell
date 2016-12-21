import Action, { SetPathAction } from 'state/action';

const reduceSetPath = ( state: string[] = [], action: Action ) => {
	if ( action.type === 'SET_PATH' ) {
		return action.path;
	}
	return state;
};

export default ( state: string[] = [], action: Action ) => reduceSetPath( state, action );

export const setPath = ( path: string[] ): SetPathAction => ({ type: 'SET_PATH', path });
