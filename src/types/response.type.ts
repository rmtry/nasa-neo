export interface HandlerResolveType {
  status: SuccessResponseEnum;
  statusCode: number;
  data: any;
  message?: string;
}

export interface HandlerRejectType {
  status: ErrorResponseEnum;
  statusCode: number;
  message?: string;
}

export enum ErrorResponseEnum {
  BAD_REQUEST = "BAD_REQUEST",
  API_ERROR = "API_ERROR",
}

export enum SuccessResponseEnum {
  OK = "OK",
}
