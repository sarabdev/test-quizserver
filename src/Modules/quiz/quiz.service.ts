import { Question } from 'src/typeorm/entities/questions';
import { Quiz } from 'src/typeorm/entities/quizs';
import { Category } from 'src/typeorm/entities/catagories';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { QuizDto } from 'src/dto/quizs.dto';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Category)
    private categoryRepo: Repository<Category>,
    @InjectRepository(Quiz)
    private quizRepo: Repository<Quiz>,
    @InjectRepository(Question)
    private questionRepo: Repository<Question>,
  ) {}

  async create(id: number, data: QuizDto): Promise<Quiz> {
    const category = await this.categoryRepo.findOne({ where: { id } });
    const quiz = this.quizRepo.create(data);
    quiz.category = category;
    return this.quizRepo.save(quiz);
  }

  async findAll(id: number): Promise<Quiz[]> {
    const category = await this.categoryRepo.findOne({
      where: { id },
      relations: ['quiz', 'quiz.questions'],
    });
    const quizs = category.quiz;
    return quizs;
  }
  async findOne(name: string): Promise<Quiz> {
    const quiz = await this.quizRepo.findOne({ where: { name } });
    return quiz;
  }
  async findOneBy(id: number): Promise<Quiz> {
    const quiz = await this.quizRepo.findOne({
      where: { id },
      relations: ['questions'],
    });

    return quiz;
  }

  async update(id: number, attr: Partial<Quiz>): Promise<Quiz> {
    const quiz = await this.quizRepo.findOne({ where: { id } });
    if (!quiz) {
      throw new NotFoundException('Quiz not exist');
    }
    Object.assign(quiz, attr);
    return this.quizRepo.save(quiz);
  }

  async delete(id: number): Promise<Quiz> {
    const quiz = await this.quizRepo.findOne({
      where: { id },
      relations: ['questions'],
    });
    if (!quiz) {
      throw new NotFoundException('quiz not exist');
    }
    await Promise.all(
      quiz.questions.map(async (question) => {
        await this.questionRepo.remove(question);
      }),
    );
    return this.quizRepo.remove(quiz);
  }
}
