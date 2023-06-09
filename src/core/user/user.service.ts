import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserEntity } from './user.entity'
import { generate } from 'generate-password'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) { }

  async create(userData: any) {
    const {
      login,
      password,
      phone,
      countryCode,
      firstName,
      lastName,
      registerFefCode
    } = userData

    let refCode = null

    while (true) {
      refCode = generate({ length: 10, numbers: true })
      const user = await this.getByRefCode(refCode)
      if (!user) break
    }

    if (registerFefCode) {
      const user = await this.getByRefCode(registerFefCode)
      if (user) {
        await this.update(user.ID, { countFriends: ++user.countFriends })
      }
    }

    const response = await this.userRepository.insert({
      login,
      password,
      phone,
      countryCode,
      firstName,
      lastName,
      refCode,
      avatarAddress: null,
    })

    return response.identifiers[0].ID as string
  }

  getByRefUsers(refUserID: string) {
    return this.userRepository.find({
      where: { refUserID },
    })
  }

  getByRefCode(refCode: string) {
    return this.userRepository.findOne({
      where: { refCode },
    })
  }

  getByID(ID: string) {
    return this.userRepository.findOne({ where: { ID } })
  }

  get(...args: Partial<UserEntity>[]) {
    // return this.userRepository.findOne({ where: args })
  }

  getByPhone(phone: string) {
    return this.userRepository.findOne({ where: { phone } })
  }

  async getByLogin(login: string) {
    return this.userRepository.findOne({ where: { login } })
  }

  update(ID: string, dataUpdate: Partial<UserEntity>) {
    return this.userRepository.update(ID, { ...dataUpdate })
  }

  updatePassword(userID: string, password: string) {
    return this.userRepository.update(userID, { password })
  }

  deleteByID(ID: string) {
    return this.userRepository.delete(ID)
  }
}
