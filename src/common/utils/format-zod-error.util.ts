import { HttpStatusCodes } from '@constants/http.constants';
import { ApiResponse } from './response.util';

export const formatZodError = (error: any): string[] => {
  const messages: string[] = [];

  error.issues.forEach((issue: any) => {
    const field = issue.path.join('.');
    const message = issue.message;

    messages.push(`'${field}': ${message}`);
  });

  return messages;
};

export const parseDto = (dto: any, schema: any) => {
  const parsedResult = schema.safeParse(dto);
  if (!parsedResult.success) {
    const formattedErrors = formatZodError(parsedResult.error);
    return ApiResponse.error(HttpStatusCodes.BAD_REQUEST, formattedErrors);
  }
};
