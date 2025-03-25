import {
  BadRequestException,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { ISuccessResponse, IErrorResponse } from '@interfaces/response.interface';
import { HttpMessages, HttpStatusCodes } from '@constants/http.constants';
import { ApiResponse } from './response.util';

export function handleServiceError(
  error: any,
  logError: boolean = true,
): ISuccessResponse<any> | IErrorResponse {
  if (
    error instanceof NotFoundException ||
    error instanceof BadRequestException ||
    error instanceof ConflictException ||
    error instanceof UnauthorizedException
  ) {
    throw error;
  }

  // Database-related errors
  if (error instanceof QueryFailedError) {
    return ApiResponse.error(HttpStatusCodes.BAD_REQUEST, `Database error: ${error.message}`);
  }

  if (logError) console.error('Unhandled exception:', error);

  // Generic fallback for unhandled exceptions
  return ApiResponse.error(
    HttpStatusCodes.INTERNAL_SERVER_ERROR,
    HttpMessages.INTERNAL_SERVER_ERROR,
  );
}
