import { HttpStatusCodes } from '@constants/http.constants';
import { IErrorResponse, ISuccessResponse } from '../interfaces/response.interface';

export class ApiResponse {
  static success<T>(
    statusCode: number = HttpStatusCodes.OK,
    data: T | null = null,
  ): ISuccessResponse<T> {
    return {
      statusCode,
      data,
    };
  }

  static error(
    statusCode: number = HttpStatusCodes.INTERNAL_SERVER_ERROR,
    error: string | object | null = null,
  ): IErrorResponse {
    return {
      statusCode,
      error,
    };
  }
}
