import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { Request } from 'express';
import Utils from "../../utils/helpers";

const AvatarFileInterceptor = FileInterceptor('avatar', {
  storage: diskStorage({
    destination: 'storage/avatars',
    filename(req: Request, file, callback) {
      callback(null, `${req.user.id}`);
    }
  }),
  fileFilter: Utils.createFileFilter(['jpg', 'jpeg', 'png'])
});

export { AvatarFileInterceptor };

