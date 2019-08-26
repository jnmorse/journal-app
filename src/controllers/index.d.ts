import { UserDocument } from '../schemas/user-schema';

declare global {
  namespace Express {
    // tslint:disable-next-line: no-empty-interface
    interface User extends UserDocument {}
  }
}
