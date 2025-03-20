import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Answer } from 'src/database/schemas/answer.schema';
import { CreateAnswerDto } from 'src/dto/create-answer.dto';

@Injectable()
export class AnswerService {
  constructor(@InjectModel(Answer.name) private answerModel: Model<Answer>) {}

  async create(dto: CreateAnswerDto): Promise<Answer> {
    return new this.answerModel(dto).save();
  }

  async findByQuestionnaire(questionnaireId: string): Promise<Answer[]> {
    return this.answerModel.find({ questionnaireId }).exec();
  }
}
