import { Record } from "immutable";

import { Document } from "data/Document";

interface AppStateProps {
  document: Document;
}

class AppState extends Record<AppStateProps>({
  document: new Document(),
}) {}

export { AppState };
