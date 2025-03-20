import { IsString, IsArray, IsEnum } from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  questionnaireId: string;

  @IsEnum(['text', 'single_choice', 'multiple_choice'])
  type: 'text' | 'single_choice' | 'multiple_choice';

  @IsString()
  text: string;

  @IsArray()
  options: string[];
}
