import {
  createMigrate,
  MigrationManifest,
  persistReducer,
  StateReconciler,
  Transform,
} from "redux-persist";
import { Reducer, combineReducers } from "redux";
import appSettingsReducer from "./app-settings-reducer";
import storage from "redux-persist/es/storage";
import { ReduxAction } from "../../types/redux.type";
import { RootReducerType } from "../../types/root-reducer.type";

const makePersisted = (
  key: string,
  reducer: Reducer<any, ReduxAction>,
  migrationPlan: MigrationManifest | undefined = undefined,
  stateReconciler: StateReconciler<RootReducerType> | undefined = undefined,
  transforms:
    | Transform<RootReducerType, RootReducerType>[]
    | undefined = undefined,
  blacklist: string[] | undefined = undefined,
  whitelist: string[] | undefined = undefined,
  migrationVersion: number | undefined = undefined
) => {
  const version = migrationVersion || 1;
  return persistReducer(
    {
      key,
      storage,
      stateReconciler,
      transforms,
      blacklist,
      whitelist,
      version,
      migrate: migrationPlan && createMigrate(migrationPlan, { debug: true }),
    },
    reducer
  );
};

const rootReducer = combineReducers({
  appSettingsReducer: makePersisted("appSettingsReducer", appSettingsReducer),
});

export default rootReducer;
