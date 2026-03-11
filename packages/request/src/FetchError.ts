export class FetchError extends Error {
  readonly status: number;
  readonly response: Response;

  constructor(message: string, status: number, response: Response) {
    super(message);
    this.name = 'FetchError';
    this.status = status;
    this.response = response;
  }
}
