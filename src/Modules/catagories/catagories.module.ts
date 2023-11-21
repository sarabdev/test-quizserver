import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CatagoriesController } from './catagories.controller';
import { CatagoriesService } from './catagories.service';
import { Category } from 'src/typeorm/entities/catagories';
import { Quiz } from 'src/typeorm/entities/quizs';
import { Question } from 'src/typeorm/entities/questions';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Quiz, Question])],
  controllers: [CatagoriesController],
  providers: [CatagoriesService],
})
export class CatagoriesModule {}
