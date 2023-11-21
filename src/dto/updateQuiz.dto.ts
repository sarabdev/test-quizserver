import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateQuizDto {
  @IsString()
  @IsOptional()
  name: string;
}
