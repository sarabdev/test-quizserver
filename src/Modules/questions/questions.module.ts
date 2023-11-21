import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from 'src/typeorm/entities/questions';
import { Quiz } from 'src/typeorm/entities/quizs';
import { QuizService } from '../quiz/quiz.service';
import { Category } from 'src/typeorm/entities/catagories';
@Module({
  imports: [TypeOrmModule.forFeature([Question, Quiz, Category])],
  providers: [QuestionsService, QuizService],
  controllers: [QuestionsController],
})
export class QuestionsModule {}
