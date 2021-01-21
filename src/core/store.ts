import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { searchReducer } from "../features/search/store/reducer";

export const store = configureStore({
  reducer: {
    search: searchReducer as any,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
