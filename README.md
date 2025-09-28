

## Welcome Developers

This project demonstrates how to upload files to Amazon S3 using NestJS and the AWS SDK v3.
It includes a reusable S3Service that handles file uploads safely and returns a type-safe result.

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
  <a href="http://nestjs.com/" target="blank"><img src="https://ap-southeast-2.signin.aws.amazon.com/v2/assets/_next/static/media/aws-logo@2x.7c50e6f9.png" width="120" alt="Nest Logo" /></a>
</p>

## Environment setup

Create a .env file in the project root:

```bash
DATABASE_URL="file:./dev.db"
AWS_ACCESS_KEY_ID=**********
AWS_SECRET_ACCESS_KEY=**********
AWS_REGION=**********
AWS_BUCKET_NAME=**********
```

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Routes
```bash
# S3
http://localhost:3000/upload/s3

# local
http://localhost:3000/upload/local

# presigned URL
http://localhost:3000/upload/presigned-url
```


## Resources

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.

- Visit the [AWS SDK Documentation](https://aws.amazon.com/sdk-for-javascript) to learn more about the AWS SDK.

- Visit the [Multer Documentation](https://github.com/expressjs/multer) to learn more about the Multer.

## Author

👨‍💻 Min Khant

Full Stack Developer

NestJS | AWS | TypeScript

