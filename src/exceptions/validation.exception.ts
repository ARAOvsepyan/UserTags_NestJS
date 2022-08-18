import { HttpException, HttpStatus } from '@nestjs/common';

export class ValidationException extends HttpException {
  message;

  constructor(errors) {
    super(errors, HttpStatus.BAD_REQUEST);
    this.message = errors;
  }
}