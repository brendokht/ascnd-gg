import {
  BadRequestException,
  Controller,
  Get,
  InternalServerErrorException,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import type { Request, Response } from "express";
import { AuthGuard } from "./auth.guard";
import { ApiResponse } from "@ascnd-gg/types";
import z from "zod";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get("login")
  login(): z.infer<typeof ApiResponse> {
    const googleUrl = this.authService.login();

    return {
      redirected: true,
      redirect: googleUrl,
    };
  }

  @Get("callback")
  async callback(@Req() req: Request, @Res() res: Response) {
    const code = req.query.code.toString();

    if (!code) {
      throw new BadRequestException("Bad callback request", {
        description: "Missing callback code",
      });
    }

    try {
      const sealedSession = await this.authService.callback(code);

      res.cookie("wos-session", sealedSession, {
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });

      return res.redirect("http://localhost:3000/protected/dashboard");
    } catch (error) {
      console.error(error);
      res.clearCookie("wos-session");
      throw new InternalServerErrorException("An error occured");
    }
  }

  @Get("logout")
  async logout(
    @Res({ passthrough: true }) res: Response,
    @Req() req: Request,
  ): Promise<z.infer<typeof ApiResponse>> {
    if (!req.cookies["wos-session"]) {
      throw new BadRequestException("Bad logout request", {
        description: "Missing session",
      });
    }

    const sealedSession: string = req.cookies["wos-session"];

    const logoutUrl = await this.authService.logout(sealedSession);

    if (!logoutUrl) {
      throw new BadRequestException("Bad logout request", {
        description: "Not authenticated, no need to log out",
      });
    }

    res.clearCookie("wos-session");

    return {
      redirected: true,
      redirect: logoutUrl,
    };
  }

  @UseGuards(AuthGuard)
  @Get("me")
  me(@Req() req: Request): z.infer<typeof ApiResponse> {
    return {
      data: req["user"],
    };
  }
}
