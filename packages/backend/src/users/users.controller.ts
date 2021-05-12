import {
  BadRequestException,
  Body,
  Controller, ForbiddenException,
  Get, NotFoundException,
  Param,
  Post,
  Res,
  UploadedFile, UseGuards, UseInterceptors
} from '@nestjs/common';
import { UsersService } from "./users.service";
import { AvatarFileInterceptor } from "../upload/avatar.interceptor";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

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
      const filePath = `storage/avatars/${params.id}`;
      return res.sendFile(filePath, { root: './' });
    } catch (e) {
      throw new ForbiddenException();
    }
  }

  @Post('/uploadAvatar')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(AvatarFileInterceptor)
  async uploadAvatarForUser(@UploadedFile() file: Express.Multer.File) {
    return file;
  }
}
