import { Record, Set } from "immutable";

interface UiStateProps {
  expandedNavItems: Set<string>;
}

class UiState extends Record<UiStateProps>({
  expandedNavItems: Set(),
}) {}

export { UiState };
