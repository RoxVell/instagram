import {
  BadRequestException,
  Body,
  Controller, ForbiddenException,
  Get, HttpException,
  Param,
  Post, Res,
  UploadedFile, UseInterceptors
} from '@nestjs/common';
import { UsersService } from "./users.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import * as path from 'path';
import * as fs from "fs";

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
};

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService
  ) { }

  @Post()
  async createUser(@Body() dto) {
    try {
      return await this.usersService.createUser(dto);
    } catch (e) {
      console.error('POST /users error');
      throw new BadRequestException();
    }
  }

  @Get()
  getUsers() {
    return this.usersService.getAll();
  }

  @Get(':id')
  async getUserById(@Param() params) {
    try {
      return await this.usersService.getUserById(String(params.id));
    } catch (e) {
      return {success: false, message: "Entity not found"};
    }
  }

  @Get('/avatar/:id')
  async getAvatarByUserId(@Param() params, @Res() res) {
    try {
      const filePath = `./avatars/${params.id}`;
      console.log(filePath)
      const stats = fs.statSync(filePath);
      console.log(stats)
      return res.sendFile(filePath, { root: './' });
    } catch (e) {
      throw new ForbiddenException();
    }
  }

  @Post('uploadAvatar/:id')
  @UseInterceptors(FileInterceptor('avatar', {
    storage: diskStorage({
      destination: './avatars/',
      filename(req, file: Express.Multer.File, callback: (error: (Error | null), filename: string) => void): void {
        const name = file.originalname.split('.')[0];
        const fileExtName = path.extname(file.originalname);
        const randomName = Array(4)
          .fill(null)
          .map(() => Math.round(Math.random() * 16).toString(16))
          .join('');
        callback(null, `${req.params.id}`);
      }
    }),
    fileFilter: imageFileFilter
  }))
  async uploadAvatarForUser(@Param() params, @UploadedFile() file: Express.Multer.File) {
    try {
      const userId = params.id;

      console.log('Uploaded file', file)

      if (!userId || !file) {
        throw new BadRequestException();
      }

    } catch (e) {
      throw new BadRequestException();
    }
  }
}
