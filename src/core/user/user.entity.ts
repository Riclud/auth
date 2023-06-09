import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  ID: string

  @Column()
  login: string

  @Column()
  phone: string

  @Column()
  password: string

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole

  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column()
  countryCode: string

  @Column({ nullable: true })
  avatarAddress: string

  @Column({ default: false })
  isVerified: boolean

  @Column({ type: 'simple-json', nullable: true, default: null })
  verifiedData: null

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @Column()
  refCode: string

  @ManyToOne(() => UserEntity, (user) => user.ID, {
    nullable: true,
  })
  refUser: UserEntity

  @Column({ name: 'refUserID', nullable: true })
  refUserID: string

  @Column({ default: 0 })
  countFriends: number

  @Column({ default: 0 })
  affiliateBalance: string
}
