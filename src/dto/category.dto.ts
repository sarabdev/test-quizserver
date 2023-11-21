import { IsNotEmpty } from 'class-validator';

export class CategoryDto {
  @IsNotEmpty({ message: 'User Should have name' })
  name: string;
}
