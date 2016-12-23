import { CellState } from 'state';
import Action from 'state/action';

export default ( cells: Map<number, CellState> = new Map(), action: Action ) => cells;
