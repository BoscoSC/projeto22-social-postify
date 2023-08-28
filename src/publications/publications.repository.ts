import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePublicationsDto } from 'src/publications/dto/create-publications.dto';
import { UpdatePublicationsDto } from 'src/publications/dto/update-publications.dto';

@Injectable()
export class PublicationsRepository {
  constructor(private prisma: PrismaService) {}

  async create(createPublicationDto: CreatePublicationsDto) {
    return await this.prisma.publication.create({
      data: createPublicationDto,
    });
  }

  async findAll() {
    return await this.prisma.publication.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.publication.findUnique({
      where: { id },
    });
  }

  async update(id: number, updatePublicationDto: UpdatePublicationsDto) {
    return await this.prisma.publication.update({
      where: { id },
      data: updatePublicationDto,
    });
  }

  async delete(id: number) {
    return await this.prisma.publication.delete({ where: { id } });
  }

  async publicationCountByMediaId(mediaId: number) {
    return await this.prisma.publication.count({
      where: { mediaId },
    });
  }

  async publicationCountByPostId(postId: number) {
    return await this.prisma.publication.count({
      where: { postId },
    });
  }
}
