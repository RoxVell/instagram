import { forwardRef, Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { MongooseModule } from "@nestjs/mongoose";
import { Comment, CommentDocument, CommentSchema } from "./comment.model";
import { PostsModule } from "../posts/posts.module";
import { CommentLikes, CommentLikesSchema } from "./comment-likes.model";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Comment.name, schema: CommentSchema },
      { name: CommentLikes.name, schema: CommentLikesSchema },
    ]),
    forwardRef(() => PostsModule),
  ],
  providers: [CommentsService],
  controllers: [CommentsController],
  exports: [CommentsService]
})
export class CommentsModule {}
