import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type QuestionType = 'text' | 'single_choice' | 'multiple_choice';

@Schema({ timestamps: true, versionKey: false })
export class Question extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Questionnaire', required: true })
  questionnaireId: Types.ObjectId;

  @Prop({ required: true, enum: ['text', 'single_choice', 'multiple_choice'] })
  type: QuestionType;

  @Prop({ required: true })
  text: string;

  @Prop({ type: [String], default: [] })
  options: string[];
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
