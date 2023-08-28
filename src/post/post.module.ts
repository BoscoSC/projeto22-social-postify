import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PublicationsModule } from 'src/publications/publications.module';

@Module({
  controllers: [PostController],
  providers: [PostService],
  imports: [PublicationsModule],
  exports: [PostService],
})
export class PostModule {}
