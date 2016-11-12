export const SET_PATH = 'SET_PATH';
export const setPath = path => ({ type: SET_PATH, path: path });

export const EXPAND_FIELD = 'EXPAND_FIELD';
export const expandField = id => ({ type: EXPAND_FIELD, id: id });

export const COLLAPSE_FIELD = 'COLLAPSE_FIELD';
export const collapseField = id => ({ COLLAPSE_FIELD, id: id });
