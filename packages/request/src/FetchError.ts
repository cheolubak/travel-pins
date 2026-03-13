export class FetchError<T = unknown> extends Error {
  readonly #data: T;
  readonly #response: Response;

  constructor(data: T, response: Response) {
    super(`HTTP error! status: ${response.status}`);
    this.name = 'FetchError';
    this.#data = data;
    this.#response = response;
  }

  get data(): T {
    return this.#data;
  }

  get header(): Headers {
    return this.#response.headers;
  }

  get status(): number {
    return this.#response.status;
  }

  get url(): string {
    return this.#response.url;
  }
}
