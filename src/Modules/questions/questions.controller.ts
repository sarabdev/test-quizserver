import { UpdateQuestionDto } from './../../dto/updateQuestion.dto';
import { Delete } from '@nestjs/common/decorators/http';
import { QuizService } from './../quiz/quiz.service';
import { QuestionDto } from './../../dto/questions.dto';
import {
  Controller,
  NotFoundException,
  Param,
  Post,
  Body,
  Get,
  Patch,
} from '@nestjs/common';
import { QuestionsService } from './questions.service';

@Controller('questions')
export class QuestionsController {
  constructor(
    private questionService: QuestionsService,
    private quizService: QuizService,
  ) {}

  @Post('/:id')
  async createQuestion(
    @Param('id') id: number,
    @Body() questionData: QuestionDto,
  ) {
    const quiz = await this.quizService.findOneBy(id);
    if (!quiz) {
      throw new NotFoundException('quiz not exist');
    }
    if (quiz.questions) {
      quiz.questions.map((item) => {
        if (item.question === questionData.question) {
          throw new NotFoundException(
            'Question is already assign to this quiz',
          );
        }
      });
    }
    const question = await this.questionService.create(id, questionData);
    return question;
  }

  @Get(':id')
  async getAllQuestion(@Param('id') id: string) {
    const question = await this.questionService.findAll(parseInt(id));
    return question;
  }

  @Patch(':id')
  async updateQuestion(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    const question = await this.questionService.update(
      parseInt(id),
      updateQuestionDto,
    );
    return question;
  }

  @Get('/:id')
  async getQuestion(@Param('id') id: string) {
    const quest = await this.questionService.findOneBy(parseInt(id));
    return quest;
  }

  @Delete('/:id')
  async removeQuestion(@Param('id') quizId: string) {
    return await this.questionService.delete(parseInt(quizId));
  }
}
