import { ApiProperty } from '@nestjs/swagger';

export class CreatePostResDto {
  @ApiProperty({
    default: 201,
  })
  status: number;

  @ApiProperty({
    default: 'Post created',
  })
  message: string;

  @ApiProperty({
    default: [],
  })
  errors: string[];

  @ApiProperty({
    default: {
      id: 4,
      event_id: 3,
      body: 'sdfdsds',
      image_link: null,
    },
  })
  data: any;
}

export class UpdatePostResDto {
  @ApiProperty({
    default: 200,
  })
  status: number;

  @ApiProperty({
    default: 'Post updated',
  })
  message: string;

  @ApiProperty({
    default: [],
  })
  errors: string[];

  @ApiProperty({
    default: {
      id: 4,
      body: 'sdfdsds',
      image_link: null,
    },
  })
  data: any;
}

export class DeletePostResDto {
  @ApiProperty({
    default: 200,
  })
  status: number;

  @ApiProperty({
    default: 'Post Deleted',
  })
  message: string;

  @ApiProperty({
    default: [],
  })
  errors: string[];

  @ApiProperty({
    default: null,
  })
  data: any;
}

export class ListPostResDto {
  @ApiProperty({
    default: 201,
  })
  status: number;

  @ApiProperty({
    default: 'Post created',
  })
  message: string;

  @ApiProperty({
    default: [],
  })
  errors: string[];

  @ApiProperty({
    default: {
      posts: [
        {
          createdAt: '2022-05-02T18:45:19.301Z',
          id: 4,
          body: 'sdfdsds',
          image_link: null,
        },
        {
          createdAt: '2022-05-02T18:45:16.130Z',
          id: 3,
          body: 'sdfdsds',
          image_link: null,
        },
      ],
      meta: {
        totalItems: 2,
        itemCount: 2,
        itemsPerPage: 20,
        totalPages: 1,
        currentPage: 1,
      },
    },
  })
  data: any;
}
