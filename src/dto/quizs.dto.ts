import { IsNotEmpty } from 'class-validator';

export class QuizDto {
  @IsNotEmpty({ message: 'Quiz should have name' })
  name: string;

  @IsNotEmpty({ message: 'Quiz should have time' })
  time: number;
}
