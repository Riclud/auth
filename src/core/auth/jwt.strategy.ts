import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { TokenService } from './token/token.service'
import { ConfigService } from '@nestjs/config'
import { ConfigType } from 'src/core/config/config'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private tokenService: TokenService,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<ConfigType['JWT']>('JWT').ACCESS.key,
    })
  }

  async validate({ ID }: { ID: string }) {
    return await this.tokenService.getByAccessID(ID)
  }
}
