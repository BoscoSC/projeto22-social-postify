import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostRepository } from './post.repository';
import { PublicationsRepository } from 'src/publications/publications.repository';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly publicationsRepository: PublicationsRepository,
  ) {}

  async create(createPostDto: CreatePostDto) {
    return await this.postRepository.create(createPostDto);
  }

  async findAll() {
    return await this.postRepository.findAll();
  }

  async findOne(id: number) {
    const post = await this.postRepository.findOne(id);

    if (!post) throw new NotFoundException();

    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const post = await this.postRepository.findOne(id);
    if (!post) throw new NotFoundException();

    return await this.postRepository.update(id, updatePostDto);
  }

  async remove(id: number) {
    const post = await this.postRepository.findOne(id);

    if (!post) throw new NotFoundException();

    const publicationsCount =
      await this.publicationsRepository.publicationCountByPostId(id);
    if (publicationsCount > 0)
      throw new ForbiddenException('This post is linked to a publication!');

    return await this.postRepository.delete(id);
  }
}
