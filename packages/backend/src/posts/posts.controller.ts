import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get, NotFoundException,
  Param,
  Post, Req, UploadedFiles,
  UseGuards, UseInterceptors
} from '@nestjs/common';
import PostCreateDto from "../../../../shared/types/post/dto/post.create.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { PostsService } from "./posts.service";
import { PostsFileInterceptor } from "../upload/post.interceptor";
import { CommentsService } from "../comments/comments.service";
import CommentCreateDto from "../../../../shared/types/comments/dto/comment.create.dto";

@Controller('posts')
export class PostsController {
  constructor(
    private postsService: PostsService,
    private commentsService: CommentsService
  ) {}

  @Post('')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(PostsFileInterceptor)
  async createPost(@Body() postDto: PostCreateDto, @UploadedFiles() files: Express.Multer.File[], @Req() request) {
    try {
      return await this.postsService.createPost({
        userId: request.user.id,
        description: postDto.description,
        content: files
      });
    } catch (e) {
      throw new BadRequestException();
    }
  }

  @Get('/:postId')
  async getPost(@Param() params) {
    try {
      return await this.postsService.getPostById(params.postId);
    } catch (e) {
      throw new NotFoundException();
    }
  }

  @Delete('/:postId')
  @UseGuards(JwtAuthGuard)
  async deletePost(@Param() params) {
    try {
      return await this.postsService.deletePostById(params.postId);
    } catch (e) {
      throw new NotFoundException();
    }
  }

  @Get('/:postId/comments')
  async getCommentsByPostId(@Param() params) {
    try {
      return await this.commentsService.getCommentsByPostId(params.postId);
    } catch (e) {
      throw new BadRequestException();
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('/:postId/comments')
  async createComment(@Param() params, @Body() body: CommentCreateDto, @Req() request) {
    try {
      return await this.commentsService.createComment({
        userId: request.user.id,
        postId: params.postId,
        message: body.message
      });
    } catch (e) {
      throw new BadRequestException();
    }
  }
}
