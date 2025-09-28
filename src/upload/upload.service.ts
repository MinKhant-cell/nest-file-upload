import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { S3Service } from 'src/aws/s3.service';
import sharp from 'sharp';
import path from 'node:path';
import fs from 'node:fs';
import { PrismaService } from 'src/prisma/prisma.service';
type PresignedUrlResult =
  | { success: true; message: string; presignedUrl: string }
  | { success: false; error: string };

@Injectable()
export class UploadService {
  constructor(
    private s3Service: S3Service,
    private prismaService: PrismaService,
  ) {}

  async uploadFileS3(file: Express.Multer.File): Promise<string | any> {
    try {
      const fileKey = `${Date.now()}_${uuidv4()}${path.extname(file.originalname)}`;

      const fileBuffer = await sharp(file.buffer)
        .jpeg({ quality: 80 })
        .toBuffer();

      const response = await this.s3Service.uploadFile(
        fileKey,
        fileBuffer,
        file.mimetype,
      );

      if (response.success) {
        const savedFile = await this.prismaService.uploadFile.create({
          data: {
            originalName: file.originalname,
            fileName: fileKey,
            mimeType: file.mimetype,
            size: file.size.toString(),
            url: response.url || null,
          },
        });

        return {
          success: true,
          message: 'File uploaded successfully',
          file: savedFile,
        };
      }

      return {
        success: false,
        error: 'File upload failed',
      };
    } catch (error) {
      return {
        success: false,
        error: (error as Error).message || 'File upload failed',
      };
    }
  }

  async uploadFileLocal(file: Express.Multer.File): Promise<string | any> {
    const uploadDir = path.join(__dirname, '..', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    const fileName = `${Date.now()}_${uuidv4()}${path.extname(file.originalname)}`;
    const filePath = path.join(uploadDir, fileName);
    fs.writeFileSync(filePath, file.buffer);
    console.log(file);

    await this.prismaService.uploadFile.create({
      data: {
        originalName: file.originalname,
        fileName: fileName,
        mimeType: file.mimetype,
        size: file.size.toString(),
      },
    });
    return {
      message: 'File uploaded successfully',
    };
  }

  async generatePresignedUrl(
    fileName: string,
    fileType: string,
  ): Promise<PresignedUrlResult> {
    try {
      const fileKey = `uploads/${uuidv4()}-${fileName}`;
      const url = await this.s3Service.presignedURL(fileKey, fileType);
      return {
        success: true,
        message: 'Presigned URL generated successfully',
        presignedUrl: url,
      };
    } catch (error) {
      return {
        success: false,
        error: (error as Error).message || 'Failed to generate presigned URL',
      };
    }
  }
}
