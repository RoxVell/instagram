import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "./user.model";
import UserCreateDto from "../../../../shared/types/user/dto/user.create.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly usersRepository: Model<UserDocument>,
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
}
