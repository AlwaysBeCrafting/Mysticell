import { SheetState } from 'state';
import Action from 'state/action';

export default ( sheets: Map<number, SheetState> = new Map(), action: Action ) => sheets;
