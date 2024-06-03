import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  releaseDate: string;

  @Column()
  description: string;

  @Column()
  genre: string;

  @Column({ type: 'float', default: 0 })
  rating: number;
}
