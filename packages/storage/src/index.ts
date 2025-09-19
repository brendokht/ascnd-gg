import { S3Client } from "@aws-sdk/client-s3";
import "dotenv/config";

export const s3client = new S3Client({
  credentials: {
    accessKeyId: process.env.MINIO_ACCESS_KEY as string,
    secretAccessKey: process.env.MINIO_SECRET_KEY as string,
  },
  endpoint: "http://localhost:9000",
  region: "us-east-1",
  forcePathStyle: true,
});
