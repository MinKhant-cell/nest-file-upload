export class CreateUploadDto {
    id: string;
    originalName: string;
    fileName: string;
    mimeType: string;
    size: number;
    url: string;
    createdAt: Date;
}
