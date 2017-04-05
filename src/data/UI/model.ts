import { Anchor, Position } from "common/types";


export interface UiState {
	element?: JSX.Element;
	position: Position;
	anchor?: Anchor;
}

export default UiState;
