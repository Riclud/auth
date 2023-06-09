import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { UserType } from '../decorators/jwt.user.decorator'

@Injectable()
export class IsUserVerified implements CanActivate {
  constructor() { }

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest()
    const user = request.user.user as UserType

    if (user.isVerified) return false

    return true
  }
}
