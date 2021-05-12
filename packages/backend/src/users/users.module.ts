import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, UserSchema } from "./user.model";
import { UploadModule } from "../upload/upload.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema }
    UploadModule,
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersModule {}
