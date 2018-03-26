import { Record } from "immutable";

import { EntityState } from "data/EntityState";

interface AppStateProps {
  entities: EntityState;
  ui: {};
}

class AppState extends Record<AppStateProps>({
  entities: new EntityState(),
  ui: {},
}) {}

export { AppState };
