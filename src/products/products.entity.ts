import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 32 })
  category: string;

  @Column('varchar', { length: 32 })
  moviceId: string;

  @Column('varchar', { length: 32 })
  image: string;
}
