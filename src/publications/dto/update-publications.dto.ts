import { PartialType } from '@nestjs/mapped-types';
import { CreatePublicationsDto } from './create-publications.dto';

export class UpdatePublicationsDto extends PartialType(CreatePublicationsDto) {}
