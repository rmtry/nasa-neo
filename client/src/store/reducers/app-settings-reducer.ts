import produce from "immer";

import { AppSettingsReducer } from "../../types/app-settings-reducer.type";
import { ReduxAction } from "../../types/redux.type";
import { SET_APP_IS_LOADING } from "../actions/app-settings-actions";

const initialState: AppSettingsReducer = {
  isLoading: false,
};

const appSettingsReducer = produce(
  (draft: AppSettingsReducer, action: ReduxAction) => {
    const { type, payload } = action;

    switch (type) {
      case SET_APP_IS_LOADING:
        draft.isLoading = payload;
        break;
    }
  },
  initialState
);

export default appSettingsReducer;
