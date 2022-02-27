import { AxiosError } from "axios";

export class ResponseError {
  constructor(
    public code: string | number,
    public message: string,
    data?: Record<string, any>
  ) {}

  static toResponseError(error: any): ResponseError {
    if (ResponseError.isAxiosError(error)) {
      return ResponseError.fromAxiosError(error);
    }
    return ResponseError.internalServerError(error);
  }

  static internalServerError(error: Error): ResponseError {
    return new ResponseError(500, "Internal Server Error", {
      internalError: error,
    });
  }

  static fromAxiosError(error: AxiosError): ResponseError {
    const code = error.response.status || error.code;
    const message =
      error.response.data || error.response.statusText || error.message;
    return new ResponseError(code, message);
  }

  static isAxiosError(error: any): error is AxiosError {
    return error.isAxiosError;
  }
}
