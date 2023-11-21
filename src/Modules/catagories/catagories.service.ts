import { Question } from 'src/typeorm/entities/questions';
import { Quiz } from 'src/typeorm/entities/quizs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from 'src/typeorm/entities/catagories';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CatagoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepo: Repository<Category>,
    @InjectRepository(Quiz)
    private quizRepo: Repository<Quiz>,
    @InjectRepository(Question)
    private questionRepo: Repository<Question>,
  ) {}
  async create(name: string): Promise<Category> {
    const category = this.categoryRepo.create({ name });
    return this.categoryRepo.save(category);
  }

  async findAll(): Promise<Category[]> {
    const category = this.categoryRepo.find({
      relations: ['quiz', 'quiz.questions'],
    });
    return category;
  }
  async findOne(name: string): Promise<Category> {
    const category = await this.categoryRepo.findOne({ where: { name } });
    return category;
  }

  async findOneBy(id: number): Promise<Category> {
    const category = await this.categoryRepo.findOne({
      where: { id },
      relations: ['quiz'],
    });
    return category;
  }

  async update(id: number, attr: Partial<Category>): Promise<Category> {
    const category = await this.categoryRepo.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException('Category not exist');
    }
    Object.assign(category, attr);
    return this.categoryRepo.save(category);
  }
  async delete(id: number): Promise<Category> {
    const category = await this.categoryRepo.findOne({
      where: { id },
      relations: ['quiz', 'quiz.questions'],
    });
    if (!category) {
      throw new NotFoundException('Category not exist');
    }
    await Promise.all(
      category.quiz.map(async (quiz) => {
        await Promise.all(
          quiz.questions.map(async (question) => {
            await this.questionRepo.remove(question);
          }),
        );
        await this.quizRepo.remove(quiz);
      }),
    );
    return this.categoryRepo.remove(category);
  }
}
