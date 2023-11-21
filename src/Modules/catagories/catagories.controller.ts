import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  NotFoundException,
} from '@nestjs/common';
import { CategoryDto } from 'src/dto/category.dto';
import { CatagoriesService } from './catagories.service';
import { Delete } from '@nestjs/common/decorators/http';

@Controller('catagories')
export class CatagoriesController {
  constructor(private catagoriesService: CatagoriesService) {}

  @Post()
  async createCategory(@Body() categoryData: CategoryDto) {
    const category = await this.catagoriesService.findOne(categoryData.name);
    if (category) {
      throw new NotFoundException('Category already exist');
    }
    const newCategory = await this.catagoriesService.create(categoryData.name);
    return newCategory;
  }

  @Get()
  async getAllCategory() {
    const categories = await this.catagoriesService.findAll();
    return categories;
  }

  @Patch('/:id')
  async updateCategory(
    @Param('id') id: string,
    @Body() updateCategoryDta: CategoryDto,
  ) {
    const category = await this.catagoriesService.findOne(
      updateCategoryDta.name,
    );
    if (category) {
      throw new NotFoundException('Category already exist');
    }
    const categories = await this.catagoriesService.update(
      parseInt(id),
      updateCategoryDta,
    );
    return categories;
  }

  @Get('/:id')
  async getCategory(@Param('id') id: string) {
    console.log(id);
    const category = await this.catagoriesService.findOneBy(parseInt(id));
    if (!category) {
      throw new NotFoundException('Category not exists');
    }
    return category;
  }

  @Delete('/:id')
  async removeCategory(@Param('id') categoryId: string) {
    return await this.catagoriesService.delete(parseInt(categoryId));
  }
}
