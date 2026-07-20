import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('float')
  price: number;

  @Column('text')
  description: string;

  @Column()
  category: string;

  @Column()
  image: string;
}