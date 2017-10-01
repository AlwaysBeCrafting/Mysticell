import { Document } from "data/Document";
import { PropertyCache } from "data/PropertyCache";
import { UiState } from "data/UiState";


interface AppState {
	document: Document;
	propertyCache: PropertyCache;
	uiState: UiState;
}


export { AppState };
