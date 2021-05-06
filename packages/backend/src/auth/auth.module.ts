import { Module } from '@nestjs/common';
import { PassportModule } from "@nestjs/passport";
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from "./strategies/local.strategy";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { UsersModule } from "../users/users.module";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    UsersModule,
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: process.env.JWT_EXPIRES_IN
        },
      })
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [
    AuthService
  ]
})
export class AuthModule {}
