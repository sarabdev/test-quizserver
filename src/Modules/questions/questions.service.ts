import { QuestionDto } from './../../dto/questions.dto';
import { Question } from 'src/typeorm/entities/questions';
import { Quiz } from 'src/typeorm/entities/quizs';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private questionRepo: Repository<Question>,
    @InjectRepository(Quiz)
    private quizRepo: Repository<Quiz>,
  ) {}

  async create(id: number, data: QuestionDto): Promise<Question> {
    const quiz = await this.quizRepo.findOne({ where: { id } });
    const question = this.questionRepo.create(data);
    question.quiz = quiz;
    console.log(question);
    return this.questionRepo.save(question);
  }

  async findAll(id: number): Promise<Question[]> {
    const quiz = await this.quizRepo.findOne({
      where: { id },
      relations: ['questions'],
    });
    const questions = quiz.questions;
    return questions;
  }

  async findOne(question: string): Promise<Question> {
    const quest = await this.questionRepo.findOne({ where: { question } });
    return quest;
  }
  async findOneBy(id: number): Promise<Question> {
    const question = await this.questionRepo.findOne({ where: { id } });
    return question;
  }

  async update(id: number, attr: Partial<Question>): Promise<Question> {
    const question = await this.questionRepo.findOne({ where: { id } });
    if (!question) {
      throw new NotFoundException('Question not exist');
    }
    Object.assign(question, attr);
    return this.questionRepo.save(question);
  }
  async delete(id: number): Promise<Question> {
    const question = await this.questionRepo.findOne({ where: { id } });
    if (!question) {
      throw new NotFoundException('Question not exist');
    }
    return this.questionRepo.remove(question);
  }
}
