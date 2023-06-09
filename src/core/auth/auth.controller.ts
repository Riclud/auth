import { Body, Controller, Get, Post } from '@nestjs/common'
import { UserRole } from '../user/user.entity'
import { AuthLoginDto } from './auth.dto'
import { AuthService } from './auth.service'
import { Meta, MetaType } from './decorators/jwtMeta.decorator'
import { Public } from './guards/jwtPublic.guard'
import { Token, TokenType } from './decorators/jwtToken.decorator'
import { User, UserType } from './decorators/jwt.user.decorator'
import { Roles } from './roles.decorator'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Get('lang/list')
  @Public()
  langList() {
    return this.authService.getLangList()
  }

  @Post('login')
  @Public()
  login(@Body() authLoginDto: AuthLoginDto, @Meta() meta: MetaType) {
    return this.authService.login(authLoginDto, meta)
  }

  @Post('register')
  @Public()
  register(@Body() body: any, @Meta() meta: MetaType) {
    // @Body() authRegisterDto: AuthRegisterDto,
    return this.authService.register(body, meta.IP)
  }

  @Post('refresh')
  @Public()
  refresh(@Body('token') token: string, @Meta() meta: MetaType) {
    return this.authService.refresh(token, meta)
  }

  @Get('check')
  check() {
    return 'ok'
  }

  @Post('restore')
  @Public()
  restore(@Body('login') login: string) {
    return this.authService.restore(login)
  }

  @Get('logout')
  async logOut(@Token() token: TokenType) {
    await this.authService.logOut(token.ID)
    return 'ok'
  }

  @Get('check/admin')
  @Roles(UserRole.ADMIN)
  checkAdmin() {
    return 'ok'
  }

  @Get('sessions')
  getSessions(@User() user: UserType) {
    return this.authService.getSessions(user.ID)
  }

  @Post('kill/sessions')
  async killSession(@Token() token: TokenType) {
    await this.authService.killSession(token.user.ID, token.ID)
    return 'ok'
  }

  @Post('kill/sessions/all')
  killAllSessions(@Token() token: TokenType) {
    return this.authService.killAllSessions(token.user.ID, token.ID)
  }
}
