import {
  ConflictException,
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { PublicationsRepository } from 'src/publications/publications.repository';

@Injectable()
export class MediaService {
  constructor(
    private readonly mediaRepository: MediaRepository,
    private readonly publicationRepository: PublicationsRepository,
  ) {}

  async create(createMediaDto: CreateMediaDto) {
    const { title, username } = createMediaDto;
    const existsMedia = await this.mediaRepository.getMediaWithUserAndTitle(
      title,
      username,
    );
    if (existsMedia) {
      throw new ConflictException();
    }
    return await this.mediaRepository.create({ title, username });
  }

  async findAll() {
    return await this.mediaRepository.findAll();
  }

  async findOne(id: number) {
    const media = await this.mediaRepository.findOne(id);
    if (media) {
      return media;
    }
    throw new NotFoundException();
  }

  async update(id: number, updateMediaDto: UpdateMediaDto) {
    const { title, username } = updateMediaDto;
    const media = await this.mediaRepository.findOne(id);
    if (!media) {
      throw new NotFoundException();
    }

    const existsMedia = await this.mediaRepository.getMediaWithUserAndTitle(
      title,
      username,
    );

    if (existsMedia) {
      throw new ConflictException();
    }

    return await this.mediaRepository.update(id, { title, username });
  }

  async remove(id: number) {
    const media = await this.mediaRepository.findOne(id);
    if (!media) {
      throw new NotFoundException();
    }

    const publicationsCount =
      await this.publicationRepository.publicationCountByMediaId(media.id);
    if (publicationsCount > 0) {
      throw new ForbiddenException('This media is linked to a publication');
    }
    return await this.mediaRepository.delete(id);
  }
}
