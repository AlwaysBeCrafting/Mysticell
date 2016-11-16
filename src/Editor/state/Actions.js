export const SET_PATH = 'SET_PATH';
export const setPath = path => ({ type: SET_PATH, path });

export const EXPAND_FIELD = 'EXPAND_FIELD';
export const expandField = id => ({ type: EXPAND_FIELD, id });

export const COLLAPSE_FIELD = 'COLLAPSE_FIELD';
export const collapseField = id => ({ type: COLLAPSE_FIELD, id });



export default {
	SET_PATH,
	setPath,
	
	EXPAND_FIELD,
	expandField,
	
	COLLAPSE_FIELD,
	collapseField,
};
