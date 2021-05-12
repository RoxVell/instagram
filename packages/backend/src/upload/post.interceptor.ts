import { Request } from 'express';
import { FilesInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import Utils from "../../utils/helpers";

const PostsFileInterceptor = FilesInterceptor('files', 10, {
  storage: diskStorage({
    destination: 'storage/posts',
    filename(req: Request, file, callback) {
      const fileExtName = path.extname(file.originalname);
      callback(null, `${uuidv4()}${fileExtName}`);
    }
  }),
  fileFilter: Utils.createFileFilter(['jpg', 'jpeg', 'png', 'mp4', 'mkv'])
});

export { PostsFileInterceptor };

