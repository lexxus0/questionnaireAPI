import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Answer extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Questionnaire', required: true })
  questionnaireId: Types.ObjectId;

  @Prop([
    {
      questionId: { type: Types.ObjectId, ref: 'Question', required: true },
      answer: { type: [String], required: true },
    },
  ])
  answers: { questionId: Types.ObjectId; answer: string | string[] }[];
}

export const AnswerSchema = SchemaFactory.createForClass(Answer);
