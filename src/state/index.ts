import Doc, { DocUI } from 'data/doc';

interface AppState {
	doc: Doc;
	path: string[];
	ui: DocUI;
};

export default AppState;
