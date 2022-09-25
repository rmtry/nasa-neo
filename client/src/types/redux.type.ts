export interface ReduxAction {
  type: string;
  payload?: any;
}

export type ReduxActionCreator = ({ ...args }?) => ReduxAction;
