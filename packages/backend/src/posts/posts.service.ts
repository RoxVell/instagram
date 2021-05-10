import { Injectable, } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model, } from "mongoose";
import { Post, PostDocument } from "./post.model";
import PostCreateDto from "../../../../shared/types/post/dto/post.create.dto";
import { PostContent } from "../../../../shared/types/post/consts/post-content";
import { POST_FILE_TYPE, POST_FILE_TYPES } from "../../../../shared/types/post/consts/post-type.enum";

type CreatePostData = Pick<PostCreateDto, 'description'> & {
  userId: string;
  content: Express.Multer.File[];
};

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private readonly postsRepository: Model<PostDocument>
  ) {}

  async getPostById(postId: string) {
    return this.postsRepository.findById(postId);
  }

  async createPost(createPostData: CreatePostData) {
    return this.postsRepository.create({
      userId: createPostData.userId,
      content: this.getPostContentFromFiles(createPostData.content)
    });
  }

  private getPostContentFromFiles(files: Express.Multer.File[]): PostContent[] {
    return files.map((file) => {
      const fileCategory = file.mimetype.split('/')[0].toUpperCase();

      if (!POST_FILE_TYPE[fileCategory]) {
        throw new Error(`Unavailable file type: ${file.mimetype}. Available formats: ${POST_FILE_TYPES.join(', ')}`);
      }

      return {
        type: POST_FILE_TYPE[fileCategory],
        content: file.path
      };
    });
  }

  async deletePostById(postId: string) {
    return this.postsRepository.findByIdAndDelete(postId);
  }

  async getPostsByUserId(userId) {
    return this.postsRepository.find({ userId: userId });
  }
}
