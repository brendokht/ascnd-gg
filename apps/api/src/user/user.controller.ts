import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
  Req,
} from "@nestjs/common";
import { UserViewModel } from "@ascnd-gg/types";
import { UserService } from "./user.service";
import { Public } from "../auth/auth.decorator";
import { User } from "@ascnd-gg/database";
import { Request } from "express";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Get(":username")
  async getUserByUsername(
    @Param() params: { username: string },
  ): Promise<UserViewModel> {
    const user = await this.userService.getUserByUsername(params.username);

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  @Get()
  async getUsersByUsername(
    @Req() req: Request,
    @Query("username") username: string,
    @Query("page") page: string = "1",
    @Query("limit") limit: string = "5",
    @Query("teamName") teamName?: string | undefined,
  ): Promise<{
    users: Array<Omit<UserViewModel, "teams" | "createdAt">> | null;
    totalCount: number;
  }> {
    const user = req["user"] as User;

    const { users, totalCount } = await this.userService.searchUsersByUsername(
      user,
      username,
      parseInt(page),
      parseInt(limit),
      teamName,
    );

    return { users, totalCount };
  }
}
