import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ unique: true })
  email: string;
  @Column()
  password: string;
  @Column({ nullable: true })
  name: string;
  @Column({ nullable: true })
  refreshToken: string;
  @Column({ type: 'timestamptz', nullable: true })
  refreshTokenExpires: Date;
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt: Date;
}
