import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Question } from 'src/database/schemas/question.schema';
import { CreateQuestionDto } from 'src/dto/create-question.dto';

@Injectable()
export class QuestionService {
  constructor(
    @InjectModel(Question.name) private questionModel: Model<Question>,
  ) {}

  async create(dto: CreateQuestionDto): Promise<Question> {
    return new this.questionModel(dto).save();
  }

  async findByQuestionnaire(questionnaireId: string): Promise<Question[]> {
    return this.questionModel.find({ questionnaireId }).exec();
  }
}
