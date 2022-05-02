import { EntityRepository, Repository } from 'typeorm';
import { Post } from '../entity/posts.entity';

@EntityRepository(Post)
export class PostRepository extends Repository<Post>{
        
}