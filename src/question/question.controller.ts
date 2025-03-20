import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from 'src/dto/create-question.dto';
import { Question } from 'src/database/schemas/question.schema';
import { QuestionnaireService } from 'src/questionnaire/questionnaire.service';

@Controller('questions')
export class QuestionController {
  constructor(
    private readonly questionService: QuestionService,
    private readonly questionnaireService: QuestionnaireService,
  ) {}

  @Post()
  async create(
    @Body() createQuestionDto: CreateQuestionDto,
  ): Promise<Question> {
    const createdQuestion =
      await this.questionService.create(createQuestionDto);

    await this.questionnaireService.addQuestionToQuestionnaire(
      createQuestionDto.questionnaireId,
      createdQuestion._id as unknown as string,
    );

    return createdQuestion;
  }

  @Get(':questionnaireId')
  findByQuestionnaire(@Param('questionnaireId') questionnaireId: string) {
    return this.questionService.findByQuestionnaire(questionnaireId);
  }
}
