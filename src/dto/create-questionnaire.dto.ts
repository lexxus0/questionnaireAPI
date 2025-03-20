import { IsString, IsArray, IsOptional } from 'class-validator';

export class CreateQuestionnaireDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsArray()
  questions: string[];
}
