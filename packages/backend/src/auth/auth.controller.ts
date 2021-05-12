import { Body, Controller, Post, UseGuards, Request} from '@nestjs/common';
import { AuthService } from "./auth.service";
import { AuthGuard } from "@nestjs/passport";
import UserCreateDto from "../../../../shared/types/user/dto/user.create.dto";
import { LocalAuthGuard } from "./guards/local-auth.guard";

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    return this.authService.generateToken(req.user._doc);
  }

  @Post('/register')
  async register(@Body() userDto: UserCreateDto) {
    return this.authService.register(userDto);
  }
}
