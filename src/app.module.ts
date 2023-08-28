import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MediaModule } from './media/media.module';
import { PostModule } from './post/post.module';
import { PublicationsModule } from './publications/publications.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [MediaModule, PostModule, PublicationsModule],
})
export class AppModule {}
