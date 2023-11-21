import { IsNotEmpty, IsOptional, IsString, IsArray } from 'class-validator';

export class UpdateQuestionDto {
  @IsString()
  @IsOptional()
  question: string;

  @IsArray()
  @IsOptional()
  answers: (string | number)[];
}
