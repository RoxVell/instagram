import { BadRequestException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { User, UserDocument } from "./user.model";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import UserCreateDto from "../../../../shared/types/user/dto/user.create.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly usersRepository: Model<UserDocument>
  ) {}

  getAll() {
    return this.usersRepository.find();
  }

  createUser(dto: UserCreateDto) {
    return this.usersRepository.create(dto);
  }

  getUserById(id: string) {
    return this.usersRepository.findById(id);
  }

  getUserByUsername(username: string) {
    return this.usersRepository.findOne({ username });
  }

  async setAvatarForUser(userId: string, avatarUrl: string) {
    try {
      const user = await this.getUserByUsername(userId);

      if (!user) {
        throw new NotFoundException(`User with id: ${userId} not found`);
      }

      user.avatar = avatarUrl;
      return await user.save();
    } catch (e) {
      throw new BadRequestException();
    }
  }
}
