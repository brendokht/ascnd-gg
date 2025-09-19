import { s3client } from "@ascnd-gg/storage";
import { Injectable } from "@nestjs/common";

@Injectable()
export class StorageService {
  readonly client: typeof s3client;

  constructor() {
    this.client = s3client;
  }
}
