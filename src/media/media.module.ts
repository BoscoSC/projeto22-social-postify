import { Module, forwardRef } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PublicationsModule } from 'src/publications/publications.module';
import { MediaRepository } from './media.repository';
import { PublicationsRepository } from 'src/publications/publications.repository';

@Module({
  imports: [PrismaModule, forwardRef(() => PublicationsModule)],
  controllers: [MediaController],
  providers: [MediaService, MediaRepository, PublicationsRepository],
  exports: [MediaService],
})
export class MediaModule {}
