import { Reflector } from "@nestjs/core";

export const Public = Reflector.createDecorator<true>();
export const Optional = Reflector.createDecorator<true>();
