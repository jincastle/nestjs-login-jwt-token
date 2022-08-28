import { SubUser } from 'src/subusers/subusers.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 32 })
  name: string;

  @Column('varchar', { unique: true })
  email: string;

  @Column('varchar')
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => SubUser, (subuser) => subuser.user)
  subuserId: SubUser[];
}
