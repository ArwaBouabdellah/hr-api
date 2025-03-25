export interface ISuccessResponse<T> {
  statusCode: number;
  data: T | null;
}

export interface IErrorResponse {
  statusCode: number;
  error: any;
}
