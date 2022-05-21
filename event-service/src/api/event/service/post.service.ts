import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostReqDto, UpdatePostReqDto } from '../controller/v1/dto/post-req.dto';
import { EventRepository } from '../repository/event.repository';
import { PostRepository } from '../repository/post.repository';

@Injectable()
export class PostService {
  async deletePost(postId: number, hostId: any) {
    let post = await this.repository.findOne({
      where: {
        id: postId,
        event: {
          host_id: hostId,
        },
      },
      relations:['event']
    });
    if (!post) {
      throw new NotFoundException('Post Not Found');
    }
    await this.repository.delete({ id: postId });
    return null;
  }
  constructor(private repository: PostRepository, private eventRepository: EventRepository) {}
  async createPost(dto: CreatePostReqDto, hostId: string) {
    let eventId = dto.event_id;
    let event = await this.eventRepository.findOne({
      where: {
        host_id: hostId,
        id: eventId,
      },
    });
    if (!event) {
      throw new NotFoundException('Event Not Found');
    }
    let newPost = await this.repository.create({
      event,
      body: dto.body,
      image_link: dto.image_link,
    });
    newPost = await this.repository.save(newPost);
    return {
      id: newPost.id,
      event_id: newPost.event.id,
      body: newPost.body,
      image_link: newPost.image_link,
    };
  }

  async listPosts(eventId: number, page: number, limit: number, hostId: string) {
    let event = await this.eventRepository.findOne({
      where: {
        host_id: hostId,
        id: eventId,
      },
    });
    if (!event) {
      throw new NotFoundException('Event Not Found');
    }
    let { items, meta } = await this.repository.getAllPostsByEvent(eventId, hostId, page, limit);
    return {
      posts: items,
      meta: meta,
    };
  }
  async updatePost(dto: UpdatePostReqDto, postId: number, hostId: string) {
    let post = await this.repository.findOne({
      where: {
        id: postId,
        event: {
          host_id: hostId,
        },
      },
      relations:['event']
    });
    if (!post) {
      throw new NotFoundException('Post Not Found');
    }
    let updatedPost = await this.repository.save({
      ...post,
      ...dto,
    });
    return {
      id: updatedPost.id,
      body: updatedPost.body,
      image_link: updatedPost.image_link,
    };
  }
}
