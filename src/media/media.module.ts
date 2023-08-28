import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { PublicationsModule } from 'src/publications/publications.module';

@Module({
  controllers: [MediaController],
  providers: [MediaService],
  imports: [PublicationsModule],
  exports: [MediaService],
})
export class MediaModule {}
