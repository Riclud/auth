import { UserEntity } from 'src/core/user/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_tokens')
export class TokenEntity {
  @PrimaryGeneratedColumn('uuid')
  ID: string;

  @Column({ name: 'acccesID', nullable: true })
  acccesID: string;

  @Column({ name: 'refreshID' })
  refreshID: string;

  @ManyToOne(() => UserEntity, (user) => user.ID, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: UserEntity;

  @Column({ name: 'userID' })
  userID: string;

  @Column({ nullable: true })
  IP: string;

  @Column({ name: 'user_agent', nullable: true })
  userAgent: string;

  @Column({ name: 'meta_info', nullable: true })
  metaInfo: string;
}
