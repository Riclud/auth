import { Controller, Get } from '@nestjs/common'
import { User, UserType } from '../auth/decorators/jwt.user.decorator'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
  ) { }

  @Get('info')
  async get(@User() user: UserType) {
    const userInfo = await this.userService.getByID(user.ID)

    return {
      name: userInfo.firstName,
      surname: userInfo.lastName,
      email: userInfo.login,
      phone: userInfo.phone,
      countryCode: userInfo.countryCode,
      avatarAddress: userInfo.avatarAddress,
    }
  }
}
