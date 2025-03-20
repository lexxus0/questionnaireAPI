import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Questionnaire } from 'src/database/schemas/questionnaire.schema';
import { CreateQuestionnaireDto } from 'src/dto/create-questionnaire.dto';
import { UpdateQuestionnaireDto } from 'src/dto/update-questionnaire.dto';

@Injectable()
export class QuestionnaireService {
  constructor(
    @InjectModel(Questionnaire.name)
    private questionnaireModel: Model<Questionnaire>,
  ) {}

  async create(dto: CreateQuestionnaireDto): Promise<Questionnaire> {
    const questionnaire = new this.questionnaireModel(dto);
    return questionnaire.save();
  }

  async findAll(sortBy?: string): Promise<Questionnaire[]> {
    const sortOption = {};

    if (sortBy === 'name') {
      return this.questionnaireModel
        .aggregate([
          {
            $addFields: {
              nameLowerCase: { $toLower: '$name' },
            },
          },
          {
            $sort: { nameLowerCase: 1 },
          },
          {
            $project: {
              nameLowerCase: 0,
            },
          },
        ])
        .exec();
    } else if (sortBy === 'questions') {
      return this.questionnaireModel
        .aggregate([
          {
            $addFields: {
              questionsCount: { $size: '$questions' },
            },
          },
          {
            $sort: { questionsCount: -1 },
          },
          {
            $project: {
              questionsCount: 0,
            },
          },
        ])
        .exec();
    } else if (sortBy === 'completions') {
      return this.questionnaireModel
        .aggregate([
          {
            $sort: { completions: -1 },
          },
        ])
        .exec();
    }

    return this.questionnaireModel.find().populate('questions').exec();
  }

  async findById(id: string): Promise<Questionnaire | null> {
    return this.questionnaireModel.findById(id).populate('questions').exec();
  }

  async addQuestionToQuestionnaire(
    questionnaireId: string,
    questionId: string,
  ): Promise<Questionnaire | null> {
    return this.questionnaireModel.findByIdAndUpdate(
      questionnaireId,
      { $push: { questions: questionId } },
      { new: true },
    );
  }

  async update(
    id: string,
    dto: UpdateQuestionnaireDto,
  ): Promise<Questionnaire | null> {
    return this.questionnaireModel.findByIdAndUpdate(id, dto, { new: true });
  }

  async delete(id: string): Promise<Questionnaire | null> {
    return this.questionnaireModel.findByIdAndDelete(id);
  }
}
