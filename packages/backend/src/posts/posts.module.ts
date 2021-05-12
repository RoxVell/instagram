import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { MongooseModule } from "@nestjs/mongoose";
import { Post, PostSchema } from "./post.model";
import { CommentsModule } from "../comments/comments.module";
import { PostLikes, PostLikesSchema } from "./post-likes.model";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Post.name, schema: PostSchema },
      { name: PostLikes.name, schema: PostLikesSchema },
    ]),
    CommentsModule
  ],
  providers: [PostsService],
  controllers: [PostsController],
  exports: [PostsService]
})
export class PostsModule {}
