import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../auth/auth.guard";
import { Request } from "express";
import { User } from "@ascnd-gg/database";
import { MeService } from "./me.service";

@UseGuards(AuthGuard)
@Controller("me")
export class MeController {
  constructor(private readonly meService: MeService) {}

  @Get("teams")
  async getCurrentUserTeams(@Req() req: Request) {
    const user: User = req["user"];

    const teams = await this.meService.getCurrentUserTeams(user.id);

    return teams;
  }
}
