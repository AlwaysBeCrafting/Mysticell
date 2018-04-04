import { Action } from "./actions";
import { Document } from "./model";

const reducer = (state = new Document(), action: Action): Document => {
  switch (action.type) {
    default:
      return state;
  }
};

export { reducer };
