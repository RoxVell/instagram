import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import UserCreateDto from "../../../../shared/types/user/dto/user.create.dto";
import * as bcrypt from 'bcryptjs';
import { User } from "../users/user.model";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.getUserByUsername(username).select('+password');

    if (!user) throw new NotFoundException();

    const isPasswordsMatch = await this.isPasswordsMatch(password, user.password);

    if (isPasswordsMatch) {
      const { ...result } = user;
      return result;
    }

    return null;
  }

  async login(userDto: UserCreateDto) {
    console.log(userDto)
    const user = await this.validateUser(userDto.username, userDto.password);
    return this.generateToken(user);
  }

  async generateToken(user: User) {
    const payload = { username: user.username };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(userDto: UserCreateDto) {
    try {
      const isUserWithUsernameExists = await this.usersService.getUserByUsername(userDto.username);

      if (isUserWithUsernameExists) throw new BadRequestException();

      const hashPassword = await bcrypt.hash(userDto.password, 10);

      const user = await this.usersService.createUser({
        ...userDto,
        password: hashPassword
      });

      console.log(user);

      return this.generateToken(user);
    } catch (e) {
      console.error(e);
      throw new BadRequestException();
    }
  }

  private async isPasswordsMatch(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
