import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({
    type: 'String',
    unique: true,
    required: true,
    trim: true,
    lowercase: true
  })
  username: string;

  @Prop({ type: 'String', unique: true, required: true, trim: true })
  email: string;

  @Prop({ type: 'String', required: true, minLength: 8, select: false })
  password: string;

  @Prop({ type: 'String' })
  avatar: string;

  @Prop({ type: 'Number', default: 0 })
  followers: number;

  @Prop({ type: 'Number', default: 0 })
  following: number;

  @Prop({ type: 'Date', default: Date.now })
  createdAt: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
