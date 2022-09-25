import { createSelector } from "@reduxjs/toolkit";
import { RootReducerType } from "../../types/root-reducer.type";

const getAppSettingsReducer = (state: RootReducerType) =>
  state.appSettingsReducer;

export const getIsAppLoading = createSelector(
  getAppSettingsReducer,
  (appSettingsReducer) => appSettingsReducer.isLoading
);
