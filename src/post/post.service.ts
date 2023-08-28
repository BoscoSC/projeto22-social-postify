import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { PublicationsService } from 'src/publications/publications.service';

@Injectable()
export class PostService {
  private posts: Post[];
  private idCount: number;
  constructor(private readonly publicationsService: PublicationsService) {
    this.posts = [];
    this.idCount = 1;
  }

  create(createPostDto: CreatePostDto) {
    const { title, text, image } = createPostDto;
    const id = this.idCount;
    const post = new Post(id, title, text, image);

    this.posts.push(post);
    this.idCount++;
    return post;
  }

  findAll() {
    return this.posts;
  }

  findOne(id: number) {
    const media = this.posts.find((p) => p._id === id);

    if (media) {
      return media;
    }
    throw new NotFoundException();
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    const { title, text, image } = updatePostDto;
    const post = this.posts.find((p) => p.id === id);

    if (!post) {
      throw new NotFoundException();
    }

    const i = post._id - 1;
    const postToUpdate = this.posts[i];

    postToUpdate._title = title;
    postToUpdate._text = text;

    if (image) {
      postToUpdate._image = image;
    }

    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    const existsPost = this.posts.some((p) => p.id === id);

    if (!existsPost) {
      throw new NotFoundException();
    }

    this.posts = this.posts.filter((p) => p.id !== id);

    return `This action removes a #${id} post`;
  }

  get _posts() {
    return this.posts;
  }
}
