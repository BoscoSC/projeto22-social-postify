import { Module, forwardRef } from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { PublicationsController } from './publications.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PostModule } from 'src/post/post.module';
import { MediaModule } from 'src/media/media.module';
import { PublicationsRepository } from './publications.repository';
import { PostRepository } from 'src/post/post.repository';
import { MediaRepository } from 'src/media/media.repository';

@Module({
  imports: [
    PrismaModule,
    forwardRef(() => PostModule),
    forwardRef(() => MediaModule),
  ],
  controllers: [PublicationsController],
  providers: [
    PublicationsRepository,
    PublicationsService,
    PostRepository,
    MediaRepository,
  ],
  exports: [PublicationsService],
})
export class PublicationsModule {}
