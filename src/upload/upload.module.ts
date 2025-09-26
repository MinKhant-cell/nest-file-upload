import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { S3Service } from 'src/aws/s3.service';

@Module({
  controllers: [UploadController],
  providers: [UploadService, S3Service],
})
export class UploadModule {}
