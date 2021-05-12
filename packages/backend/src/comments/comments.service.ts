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

interface LikeCommentData {
  userId: string;
  commentId: string;
}

@Injectable()
export class CommentsService {
  private readonly likeCommentAction: (payload: { entityId: string, ownerId: string }) => Promise<{
    error: boolean;
    message: string;
  }>;

  private readonly unlikeCommentAction: (payload: { entityId: string, ownerId: string }) => Promise<{
    error: boolean;
    message: string;
  }>;

  constructor(
    @InjectModel(Comment.name) private readonly commentsRepository: Model<CommentDocument>,
    @InjectModel(CommentLikes.name) private readonly commentLikesRepository: Model<CommentLikesDocument>,
    private postsService: PostsService
  ) {
    const { like, unlike } = Utils.likeEntityMixin(
      commentsRepository,
      commentLikesRepository,
      {
        ownerField: 'userId',
        entityField: 'commentId'
      }
    );
    this.likeCommentAction = like;
    this.unlikeCommentAction = unlike;
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

  async likeComment(likeCommentData: LikeCommentData) {
    return this.likeCommentAction({
      entityId: likeCommentData.commentId,
      ownerId: likeCommentData.userId
    });
  }

  async unlikeComment(likeCommentData: LikeCommentData) {
    return this.unlikeCommentAction({
      entityId: likeCommentData.commentId,
      ownerId: likeCommentData.userId
    });
  }
}
