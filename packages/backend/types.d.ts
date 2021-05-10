import 'express';
import { UserRequestPayload } from "./utils/interfaces";

declare module 'express' {
  interface Request {
    user?: UserRequestPayload;
  }
}
