import { Question } from './questions';
import { Category } from './catagories';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity('quizs')
export class Quiz {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Category, (catagorie) => catagorie.quiz)
  category: Category;

  @Column({ type: 'bigint' })
  time: number;

  @OneToMany(() => Question, (question) => question.quiz)
  questions: Question[];
}
