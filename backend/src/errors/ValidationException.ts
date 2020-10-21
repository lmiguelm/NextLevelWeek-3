export default class ValidationException {

  status: number;
  message: string;

  constructor(message: string, status: number) {
    this.status = status;
    this.message = message;
  }
}