export class HttpException extends Error {
  public readonly status: number;
  constructor(message: string, status = 400) {
    super(message);
    this.name = "HttpException";
    this.status = status;
  }
}
