import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePublicationsDto {
  @IsNotEmpty()
  @IsNumber()
  mediaId: number;

  @IsNotEmpty()
  @IsNumber()
  postId: number;

  @IsNotEmpty()
  @IsString()
  @IsDateString()
  date: string;
}
