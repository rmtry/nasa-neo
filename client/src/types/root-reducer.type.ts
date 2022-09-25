import { AppSettingsReducer } from "./app-settings-reducer.type";

export interface RootReducerType {
  appSettingsReducer: AppSettingsReducer;
}

export type GetState = () => RootReducerType;
