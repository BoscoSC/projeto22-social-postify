import { Module, forwardRef } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PublicationsModule } from 'src/publications/publications.module';
import { PostRepository } from './post.repository';
import { PublicationsRepository } from 'src/publications/publications.repository';

@Module({
  imports: [PrismaModule, forwardRef(() => PublicationsModule)],
  controllers: [PostController],
  providers: [PostRepository, PostService, PublicationsRepository],
  exports: [PostService],
})
export class PostModule {}
