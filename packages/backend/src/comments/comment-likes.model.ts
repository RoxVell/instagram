import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from "mongoose";

export type CommentLikesDocument = CommentLikes & Document;

@Schema()
export class CommentLikes {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Comment', required: true })
  commentId: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  userId: string;
}

export const CommentLikesSchema = SchemaFactory.createForClass(CommentLikes);
