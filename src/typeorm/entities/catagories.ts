import { Quiz } from './quizs';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('catagories')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Quiz, (quiz) => quiz.category)
  quiz: Quiz[];
}
