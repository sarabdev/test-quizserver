import { Quiz } from './quizs';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity('questions')
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  question: string;

  @Column('simple-array')
  answers: (string | number)[];

  @ManyToOne(() => Quiz, (quiz) => quiz.questions)
  quiz: Quiz;
}
