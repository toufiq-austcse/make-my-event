import { paginate } from 'nestjs-typeorm-paginate';
import { EntityRepository, Repository } from 'typeorm';
import { Post } from '../entity/posts.entity';

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {
  getAllPostsByEvent(eventId: number, hostId: string, page: number, limit: number) {
    let queryBuilder = this.createQueryBuilder('post')
      .where('post.event.id = :eventId', { eventId })
      .orderBy('post.createdAt', 'DESC')
      .select(['post.id', 'post.body', 'post.image_link', 'post.createdAt']);
    return paginate(queryBuilder, { page: page, limit: limit });
  }
}
