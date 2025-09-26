import { Injectable } from '@nestjs/common';
import { CreateUploadDto } from './dto/create-upload.dto';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { v4 as uuidv4 } from 'uuid';
import { S3Service } from 'src/aws/s3.service';

@Injectable()
export class UploadService {
  constructor(private s3Service: S3Service) {

  }

  async uploadFile(file: Express.Multer.File): Promise<string | any> {
    const fileKey = `uploads/${Date.now()}-${file.originalname}`;
    return this.s3Service.uploadFile(fileKey, file.buffer, file.mimetype)
  }

  create(createUploadDto: CreateUploadDto) {
    return 'This action adds a new upload';
  }

  findAll() {
    return `This action returns all upload`;
  }

  findOne(id: number) {
    return `This action returns a #${id} upload`;
  }

  update(id: number, updateUploadDto: UpdateUploadDto) {
    return `This action updates a #${id} upload`;
  }

  remove(id: number) {
    return `This action removes a #${id} upload`;
  }
}
