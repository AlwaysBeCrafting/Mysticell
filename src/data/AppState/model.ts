import { Map, Record } from "immutable";

import { Document } from "data/Document";
import { PropertyCache } from "data/PropertyCache";
import { UiState } from "data/UiState";

interface AppStateProps {
  document: Document;
  propertyCache: PropertyCache;
  uiState: UiState;
}

class AppState extends Record<AppStateProps>({
  document: new Document(),
  propertyCache: Map(),
  uiState: new UiState(),
}) {}

export { AppState };
