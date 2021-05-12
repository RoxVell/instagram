import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from "mongoose";

export type PostLikesDocument = PostLikes & Document;

@Schema()
export class PostLikes {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true })
  postId: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  userId: string;
}

export const PostLikesSchema = SchemaFactory.createForClass(PostLikes);
