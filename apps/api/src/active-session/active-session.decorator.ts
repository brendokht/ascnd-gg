import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import type { Session } from "@ascnd-gg/auth";

export const ActiveSession = createParamDecorator(
  (field: keyof Session | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const session: Session | undefined = request["session"];
    return field ? session?.[field] : session;
  },
);
