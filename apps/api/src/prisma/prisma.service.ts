import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@ascnd-gg/database";

@Injectable()
export class PrismaService extends PrismaClient {}
