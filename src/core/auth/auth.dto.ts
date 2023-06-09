import { IsEmail, IsNotEmpty, Length, IsPhoneNumber } from 'class-validator'

export class AuthLoginDto {
  @IsEmail()
  login: string

  @IsNotEmpty()
  password: string
}

export class AuthRegisterDto {
  @IsEmail()
  login: string

  @IsPhoneNumber()
  phone: string

  @IsNotEmpty()
  @Length(8, 32)
  password: string

  @IsNotEmpty()
  @Length(8, 32)
  confirmPassword: string

  registerFefCode: string
}
