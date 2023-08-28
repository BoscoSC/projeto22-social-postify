import { IsNotEmpty, IsString, IsOptional, IsUrl } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  text: string;

  @IsOptional()
  @IsNotEmpty()
  @IsUrl()
  image: string;
}
