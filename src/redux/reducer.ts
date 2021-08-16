import { extend } from "../utils/extend";
import { ActionType, ReduxAction } from "./actions";

export type ReduxState = {
  searchQuery?: string;
}

export type ReduxDispatch = (action: ReduxAction) => void;

const initialState: ReduxState = {
  searchQuery: undefined,
};


const reducer = (state: ReduxState = initialState, action: ReduxAction) => {
  switch (action.type) {
    case ActionType.SET_SEARCH_QUERY:
      return extend(state, {
        searchQuery: action.payload,
      });
    default:
      return state;
  }
}

export { reducer };
