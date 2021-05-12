import { BadRequestException, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { CommentsService } from "./comments.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@Controller('comments')
export class CommentsController {
  constructor(
    private commentsService: CommentsService
  ) {}
}
