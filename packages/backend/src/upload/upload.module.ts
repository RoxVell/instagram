import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { MulterModule } from "@nestjs/platform-express";
import { ConfigService } from "@nestjs/config";

@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory(configService: ConfigService) {
        return {
          dest: configService.get('STORAGE_ROOT_DIRECTORY'),
        };
      },
      inject: [ConfigService]
    })
  ],
  providers: [UploadService],
  exports: [UploadService]
})
export class UploadModule {}
