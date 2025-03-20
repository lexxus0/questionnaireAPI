import { IsString, IsArray } from 'class-validator';

export class CreateAnswerDto {
  @IsString()
  questionnaireId: string;

  @IsArray()
  answers: { questionId: string; answer: string | string[] }[];
}
