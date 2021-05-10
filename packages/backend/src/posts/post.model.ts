import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from "mongoose";
import { User } from "../users/user.model";
import { POST_FILE_TYPE } from "../../../../shared/types/post/consts/post-type.enum";
import { PostContent } from "../../../../shared/types/post/consts/post-content";

export type PostDocument = Post & Document;

@Schema()
export class Post {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: User;

  @Prop({ type: mongoose.Schema.Types.String, default: '' })
  description: string;

  @Prop({ type: 'Number', default: 0 })
  likes: number;

  @Prop({
    type: raw([{
      type: { type: 'String', enum: POST_FILE_TYPE },
      content: { type: 'String' }
    }]),
    required: true,
    validate(posts: PostContent[]) {
      if (posts.length === 0) {
        throw new Error('Post must contain content');
      }

      // TODO: replace 10 with const
      if (posts.length > 10) {
        throw new Error('The maximum amount of content for a post has been exceeded');
      }

      for (const post of posts) {
        if (!post.type) {
          throw new Error('Post content must contain the type');
        }

        if (!post.content) {
          throw new Error('Post content must contain url of media file');
        }
      }

      return true;
    }
  })
  content: PostContent[];

  @Prop({ type: 'Date', default: Date.now })
  createdAt: number;
}

export const PostSchema = SchemaFactory.createForClass(Post);
