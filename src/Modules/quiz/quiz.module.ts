import { Question } from 'src/typeorm/entities/questions';
import { CatagoriesService } from '../catagories/catagories.service';
import { Module } from '@nestjs/common';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from 'src/typeorm/entities/quizs';
import { Category } from 'src/typeorm/entities/catagories';
import { QuestionsService } from '../questions/questions.service';

@Module({
  imports: [TypeOrmModule.forFeature([Quiz, Category, Question])],
  controllers: [QuizController],
  providers: [QuizService, CatagoriesService, QuestionsService],
})
export class QuizModule {}
