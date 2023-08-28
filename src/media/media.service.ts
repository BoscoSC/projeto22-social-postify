import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { Media } from './entities/media.entity';
import { PublicationsService } from 'src/publications/publications.service';

@Injectable()
export class MediaService {
  private medias: Media[];
  private idCount: number;
  constructor(private readonly publicationsService: PublicationsService) {
    this.medias = [];
    this.idCount = 1;
  }

  create(createMediaDto: CreateMediaDto) {
    const { title, username } = createMediaDto;
    const existsMedia = this.medias.some((m) => {
      return m.title === title && m.username === username;
    });
    if (existsMedia) {
      throw new ConflictException();
    }
    const id = this.idCount;
    const media = new Media(id, title, username);
    this.medias.push(media);
    this.idCount++;
    return { id };
  }

  findAll() {
    return this.medias;
  }

  findOne(id: number) {
    const media = this.medias.find((m) => m._id === id);
    if (!media) throw new NotFoundException();
    return media;
  }

  update(id: number, updateMediaDto: UpdateMediaDto) {
    const { title, username } = updateMediaDto;
    const media = this.medias.find((m) => m._id === id);
    if (!media) throw new NotFoundException();

    const existsMedia = this.medias.some((m) => {
      return m.title === title && m.username === username && m.id !== id;
    });

    if (existsMedia) {
      throw new ConflictException();
    }

    const index = media._id - 1;
    const mediaToUpdate = this.medias[index];

    mediaToUpdate.title = title;
    mediaToUpdate.username = username;

    return `This action updates a #${id} media`;
  }

  remove(id: number) {
    const existsMedia = this.medias.some((m) => m._id === id);

    if (!existsMedia) {
      throw new NotFoundException();
    }

    this.medias = this.medias.filter((m) => m._id !== id);

    return `This action removes a #${id} media`;
  }

  get _medias() {
    return this.medias;
  }
}
