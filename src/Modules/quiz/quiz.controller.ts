import { Delete } from '@nestjs/common/decorators/http';
import { QuizDto } from './../../dto/quizs.dto';
import { QuestionDto } from './../../dto/questions.dto';
import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Patch,
  NotFoundException,
} from '@nestjs/common';
import { CatagoriesService } from '../catagories/catagories.service';
import { QuizService } from './quiz.service';

@Controller('quiz')
export class QuizController {
  constructor(
    private catagoriesService: CatagoriesService,
    private quizService: QuizService,
  ) {}

  @Post('/:id')
  async createQuiz(@Param('id') id: number, @Body() quizData: QuizDto) {
    const category = await this.catagoriesService.findOneBy(id);
    if (!category) {
      throw new NotFoundException('Category not exist');
    }
    if (category.quiz) {
      category.quiz.map((item) => {
        if (item.name === quizData.name) {
          throw new NotFoundException(
            'quiz is already assign to this category',
          );
        }
      });
    }
    const quiz = await this.quizService.create(id, quizData);
    return quiz;
  }

  @Get(':id')
  async getAllQuiz(@Param('id') id: string) {
    const quizs = await this.quizService.findAll(parseInt(id));
    return quizs;
  }

  @Patch('/:id')
  async updateQuiz(@Param('id') id: string, @Body() updateQuizDto: QuizDto) {
    const quiz = await this.quizService.update(parseInt(id), updateQuizDto);
    console.log(quiz);
    return quiz;
  }

  @Get(':id/quiz')
  async getQuiz(@Param('id') id: string) {
    const quiz = await this.quizService.findOneBy(parseInt(id));
    if (!quiz) {
      throw new NotFoundException('Quiz not exists');
    }
    return quiz;
  }

  @Delete('/:id')
  async removeCategory(@Param('id') quizId: string) {
    return await this.quizService.delete(parseInt(quizId));
  }
}
