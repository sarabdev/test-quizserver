import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuizModule } from './Modules/quiz/quiz.module';
import { QuestionsModule } from './Modules/questions/questions.module';
import { CatagoriesModule } from './Modules/catagories/catagories.module';
import { DatabaseConfig } from './Database/databaseConfig';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot(DatabaseConfig),
    QuizModule,
    QuestionsModule,
    CatagoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
