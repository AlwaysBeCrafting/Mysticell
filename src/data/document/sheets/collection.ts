import { Sheet } from "common/types/document";


class ActionTypes {}


export type Action = never;


type SheetMap = Map<number, Sheet>;

export default ( state = new Map(), action: Action ): SheetMap => state;
