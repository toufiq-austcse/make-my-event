import { Body, Controller, Post, Req, UseGuards, UseInterceptors, Get, Query, Patch, Param, Delete } from '@nestjs/common';
import { CreatePostReqDto, UpdatePostReqDto } from './dto/post-req.dto';

import { HostGuard } from '../../../../common/guards/host.guard';
import { PostService } from '../../service/post.service';
import { ResponseDto } from './dto/response.dto';
import { ApiCreatedResponse, ApiSecurity, ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { ResponseInterceptor } from '../../../../common/interceptors/response.interceptor';
import { CreatePostResDto, ListPostResDto, UpdatePostResDto, DeletePostResDto } from './dto/post-res.dto';

@ApiTags('Post')
@Controller('api/v1/posts')
@UseInterceptors(ResponseInterceptor)
export class PostsController {
  constructor(private postService: PostService) {}
  @Post()
  @ApiSecurity('host-auth')
  @UseGuards(HostGuard)
  @ApiCreatedResponse({ type: CreatePostResDto })
  async create(@Body() dto: CreatePostReqDto, @Req() req: any): Promise<ResponseDto> {
    let result = await this.postService.createPost(dto, req.user.id);
    return {
      message: 'Post created',
      data: result,
    };
  }

  @Get()
  @ApiSecurity('host-auth')
  @UseGuards(HostGuard)
  @ApiOkResponse({ type: ListPostResDto })
  async list(@Query('event_id') eventId: number, @Query('page') page: number, @Req() req: any): Promise<ResponseDto> {
    let limit = 20;
    page = page ? page : 1;
    let result = await this.postService.listPosts(eventId, page, limit, req.user.id);
    return {
      message: 'Events Found',
      data: result,
    };
  }

  @Patch(':post_id')
  @ApiSecurity('host-auth')
  @UseGuards(HostGuard)
  @ApiOkResponse({type:UpdatePostResDto})
  async update(@Body() dto:UpdatePostReqDto,@Param('post_id')postId:number,@Req() req:any):Promise<ResponseDto> {
    let result = await this.postService.updatePost(dto,postId,req.user.id);
    return{
      message:'Post updated',
      data:result
    }
  }

  @Delete(':post_id')
  @ApiSecurity('host-auth')
  @UseGuards(HostGuard)
  @ApiOkResponse({type:DeletePostResDto})
  async delete(@Param('post_id')postId:number,@Req() req:any):Promise<ResponseDto> {
    let result = await this.postService.deletePost(postId,req.user.id);
    return{
      message:'Post Deleted',
      data:result
    }
  }

}
