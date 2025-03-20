import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { QuestionnaireService } from './questionnaire.service';
import { CreateQuestionnaireDto } from 'src/dto/create-questionnaire.dto';
import { UpdateQuestionnaireDto } from 'src/dto/update-questionnaire.dto';

@Controller('questionnaires')
export class QuestionnaireController {
  constructor(private readonly questionnaireService: QuestionnaireService) {}

  @Post()
  create(@Body() createDto: CreateQuestionnaireDto) {
    return this.questionnaireService.create(createDto);
  }

  @Get()
  findAll(@Query('sortBy') sortBy: string) {
    return this.questionnaireService.findAll(sortBy);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionnaireService.findById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateQuestionnaireDto) {
    return this.questionnaireService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionnaireService.delete(id);
  }
}
