import { IsNotEmpty, IsArray, ArrayMinSize } from 'class-validator';
export class QuestionDto {
  @IsNotEmpty({ message: 'User Should have question' })
  question: string;

  @IsArray({ message: 'answers should be an array' })
  @ArrayMinSize(1, { message: 'question should have at least one answer' })
  answers: (string | number)[];
}
