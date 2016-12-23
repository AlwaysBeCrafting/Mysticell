import { CardState } from 'state';
import Action from 'state/action';

export default ( cards: Map<number, CardState> = new Map(), action: Action ) => cards;
