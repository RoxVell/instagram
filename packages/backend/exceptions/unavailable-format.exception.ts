import { HttpException, HttpStatus } from "@nestjs/common";

export default class UnavailableFormatException extends HttpException {
  constructor(formats: string[]) {
    super(`Unavailable format. Available formats: ${formats.join(', ')}`, HttpStatus.BAD_REQUEST);
  }
}
