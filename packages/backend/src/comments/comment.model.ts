import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from "mongoose";
import { Post } from "../posts/post.model";
import { User } from "../users/user.model";

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Post' })
  postId: Post;

  @Prop({ type: mongoose.Schema.Types.String, required: true, minlength: 1 })
  message: string;

  @Prop({ type: mongoose.Schema.Types.Number, default: 0, min: 0 })
  likes: number;

  @Prop({ type: mongoose.Schema.Types.Date, default: Date.now })
  createdAt;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
