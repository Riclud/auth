import { BadRequestException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { TokenEntity } from './token.entity'
import { v4 as genUUID } from 'uuid'
import { MetaType } from '../decorators/jwtMeta.decorator'
import { ExceptionKeys } from 'src/core/exceptionKeys.enum'
import { ConfigService } from '@nestjs/config'
import { ConfigType } from 'src/core/config/config'

@Injectable()
export class TokenService {
  constructor(
    private configService: ConfigService,
    @InjectRepository(TokenEntity)
    private tokenRepository: Repository<TokenEntity>,
    private jwtService: JwtService,
  ) { }

  private createToken(type: 'access' | 'refresh') {
    const JWT = this.configService.get<ConfigType['JWT']>('JWT')

    const ID = genUUID()
    let secret = null
    let expiresIn = null

    if (type === 'access') {
      secret = JWT.ACCESS.key
      expiresIn = JWT.ACCESS.time
    }

    if (type === 'refresh') {
      secret = JWT.REFRESH.key
      expiresIn = JWT.REFRESH.time
    }

    const token = this.jwtService.sign({ ID }, { secret, expiresIn })

    return { ID, token }
  }

  async create(userID: string, { IP, metaInfo, userAgent }: MetaType) {
    const { ID: acccesID, token: accessToken } = this.createToken('access')
    const { ID: refreshID, token: refreshToken } = this.createToken('refresh')

    await this.tokenRepository.insert({
      userID,
      acccesID,
      refreshID,
      IP,
      userAgent,
      metaInfo,
    })

    return {
      accessToken,
      refreshToken,
    }
  }

  getByAccessID(ID: string) {
    return this.tokenRepository.findOne({
      where: { acccesID: ID },
      relations: ['user'],
    })
  }

  getByUserID(userID: string) {
    return this.tokenRepository.find({ where: { userID } })
  }

  getByRefreshToken(token: string) {
    try {
      const JWT = this.configService.get<ConfigType['JWT']>('JWT')

      const { ID } = this.jwtService.verify(token, {
        secret: JWT.REFRESH.key,
      })

      return this.tokenRepository.findOne({
        where: { refreshID: ID },
        relations: ['user'],
      })
    } catch (e) {
      throw new BadRequestException(ExceptionKeys.INVALID_TOKEN)
    }
  }

  getByAccessToken(token: string, ignoreException: boolean = false) {
    try {
      const JWT = this.configService.get<ConfigType['JWT']>('JWT')

      const { ID } = this.jwtService.verify(token, {
        secret: JWT.ACCESS.key,
      })

      return this.tokenRepository.findOne({
        where: { acccesID: ID },
        relations: ['user'],
      })
    } catch (e) {
      if (ignoreException) {
        return null
      }

      throw new BadRequestException(ExceptionKeys.INVALID_TOKEN)
    }
  }

  getByID(ID: string) {
    return this.tokenRepository.findOne({ where: { ID } })
  }

  deleteByID(ID: string) {
    return this.tokenRepository.delete(ID)
  }

  delete(listID: string[]) {
    return this.tokenRepository.delete(listID)
  }

  deleteByAccessID(ID: string) {
    return this.tokenRepository.delete({ acccesID: ID })
  }

  deleteByUserID(userID: string) {
    return this.tokenRepository.delete({ userID })
  }
}
