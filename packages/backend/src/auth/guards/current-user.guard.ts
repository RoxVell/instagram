import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

/**
 * Checks the id of the user who is sending the request, with the userId parameter
 *
 * Used in conjunction with AuthGuard, for example: @UseGuards(JwtAuthGuard, CurrentUserGuard)
 */
@Injectable()
export class CurrentUserGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const { user, params } = context.switchToHttp().getRequest();
    return user && params.userId && user.id === params.userId;
  }
}

