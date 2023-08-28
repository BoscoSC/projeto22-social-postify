import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePublicationsDto } from './dto/create-publications.dto';
import { UpdatePublicationsDto } from './dto/update-publications.dto';
import dayjs from 'dayjs';
import { PublicationsRepository } from './publications.repository';
import { MediaRepository } from 'src/media/media.repository';
import { PostRepository } from 'src/post/post.repository';

@Injectable()
export class PublicationsService {
  constructor(
    private readonly publicationRepository: PublicationsRepository,
    private readonly mediaRepository: MediaRepository,
    private readonly postRepository: PostRepository,
  ) {}

  async create(createPublicationDto: CreatePublicationsDto) {
    const { mediaId, postId, date } = createPublicationDto;

    const media = await this.mediaRepository.findOne(mediaId);
    const post = await this.postRepository.findOne(postId);

    if (!post || !media) {
      let message = '';
      if (!post) {
        message += 'Post ';
      }
      if (!media) {
        if (message.length > 0) {
          message += 'and ';
        }
        message += 'Media ';
      }
      message += 'not exists!';
      throw new NotFoundException(message);
    }

    return await this.publicationRepository.create({ mediaId, postId, date });
  }

  async findAll() {
    return await this.publicationRepository.findAll();
  }

  async findOne(id: number) {
    const publication = await this.publicationRepository.findOne(id);

    if (!publication) throw new NotFoundException();

    return publication;
  }
  async update(id: number, updatePublicationDto: UpdatePublicationsDto) {
    const { mediaId, postId, date } = updatePublicationDto;

    const publication = await this.publicationRepository.findOne(id);

    if (!publication) throw new NotFoundException();

    const media = await this.mediaRepository.findOne(mediaId);
    const post = await this.postRepository.findOne(postId);

    if (!post || !media) {
      let message = '';
      if (!post) {
        message += 'Post ';
      }
      if (!media) {
        if (message.length > 0) {
          message += 'and ';
        }
        message += 'Media ';
      }
      message += 'not exists!';
      throw new NotFoundException(message);
    }
    const currentDate = new Date(Date.now());
    const isPassed = dayjs(currentDate).isAfter(publication.date);

    if (isPassed) throw new ForbiddenException();

    return await this.publicationRepository.update(id, {
      mediaId,
      postId,
      date,
    });
  }

  async remove(id: number) {
    const existsPublication = await this.publicationRepository.findOne(id);

    if (!existsPublication) {
      throw new NotFoundException();
    }

    return await this.publicationRepository.delete(id);
  }
}
