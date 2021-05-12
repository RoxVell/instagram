import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Comment, CommentDocument } from "./comment.model";
import { PostsService } from "../posts/posts.service";
import { CommentLikes, CommentLikesDocument } from "./comment-likes.model";
import Utils from "../../utils/helpers";

interface CreateCommentData {
  userId: string;
  postId: string;
  message: string;
}

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private readonly commentsRepository: Model<CommentDocument>,
    private postsService: PostsService
  ) {
  }

  async createComment(commentData: CreateCommentData) {
    const post = await this.postsService.getPostById(commentData.postId);

    if (!post) {
      throw new Error(`Post with id: ${commentData.postId} not found`);
    }

    return this.commentsRepository.create(commentData);
  }

  async getCommentsByPostId(postId) {
    return this.commentsRepository.find({ postId });
  }
}
