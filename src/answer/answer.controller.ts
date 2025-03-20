import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { CreateAnswerDto } from 'src/dto/create-answer.dto';

@Controller('answers')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Post()
  create(@Body() createDto: CreateAnswerDto) {
    return this.answerService.create(createDto);
  }

  @Get(':questionnaireId')
  findByQuestionnaire(@Param('questionnaireId') questionnaireId: string) {
    return this.answerService.findByQuestionnaire(questionnaireId);
  }
}
