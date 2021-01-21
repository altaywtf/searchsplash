import { configureStore, ThunkAction } from "@reduxjs/toolkit";
import type { SearchAction } from "../features/search/store/actions";
import { searchReducer, SearchState } from "../features/search/store/reducer";

export type AppState = { search: SearchState };
export type AppAction = SearchAction;

export const store = configureStore<AppState, AppAction>({
  reducer: {
    search: searchReducer,
  },
});

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  AppAction
>;
