import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3Service {
  private s3: S3Client;
  private bucketName: string;
  private region: string;

  constructor(private configService: ConfigService) {
    this.region = this.configService.get<string>('AWS_REGION', '');
    this.bucketName = this.configService.get<string>('AWS_BUCKET_NAME', '');

    this.s3 = new S3Client({
      region: this.region,
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID', ''),
        secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY', ''),
      },
    });
  }

  async uploadFile(key: string, body: Buffer, mimetype: string) {
    try {
      const command = new PutObjectCommand({
        Bucket: this.bucketName,
        Key: key,
        Body: body,
        ContentType: mimetype,
      });

      const result = await this.s3.send(command);

      if (result.$metadata.httpStatusCode === 200) {
        return {
          success: true,
          url: `https://${this.bucketName}.s3.${this.region}.amazonaws.com/${key}`,
        };
      }

      return { success: false, error: 'Upload failed, unexpected response.' };
    } catch (error) {
      console.error('S3 upload error:', error);
      return { success: false, error: error.message || error };
    }
  }
}
