import { Module } from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { PublicationsController } from './publications.controller';
import { MediaModule } from 'src/media/media.module';
import { PostModule } from 'src/post/post.module';

@Module({
  controllers: [PublicationsController],
  providers: [PublicationsService],
  imports: [MediaModule, PostModule],
  exports: [PublicationsService],
})
export class PublicationsModule {}
