import { BadRequestException, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { CommentsService } from "./comments.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@Controller('comments')
export class CommentsController {
  constructor(
    private commentsService: CommentsService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('/:commentId/like')
  async likeComment(@Req() request, @Param() params) {
    try {
      return await this.commentsService.likeComment({
        userId: request.user.id,
        commentId: params.commentId
      });
    } catch (e) {
      console.log(e)
      throw new BadRequestException();
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('/:commentId/unlike')
  async unlikeComment(@Req() request, @Param() params) {
    try {
      return await this.commentsService.unlikeComment({
        userId: request.user.id,
        commentId: params.commentId
      });
    } catch (e) {
      console.log(e)
      throw new BadRequestException();
    }
  }
}
