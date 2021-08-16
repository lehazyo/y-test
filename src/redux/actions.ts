export enum ActionType {
  SET_SEARCH_QUERY = 'SET_SEARCH_QUERY',
  SET_LOADING = 'SET_LOADING',
};

export type ReduxAction = {
  type: ActionType;
  payload: any;
};

export const ActionCreator = {
  setSearchQuery: (searchQuery?: string): ReduxAction => ({
    type: ActionType.SET_SEARCH_QUERY,
    payload: searchQuery
  }),
  setLoading: (isLoading?: boolean): ReduxAction => ({
    type: ActionType.SET_LOADING,
    payload: (isLoading === undefined) ? true : isLoading,
  })
};
