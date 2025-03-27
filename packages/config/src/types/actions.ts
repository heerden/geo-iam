export type IResponse<D, E = IResponseError> =
    | {
          status: "success";
          code: 200 | 201 | 202 | 203 | number;
          data: D;
      }
    | {
          status: "error";
          code: 400 | 401 | 402 | 422 | number;
          errors: E;
      };

export type IResponseValidationError = Record<string, string>;
export type IResponseError = string;
