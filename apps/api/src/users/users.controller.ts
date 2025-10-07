import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
  Req,
} from "@nestjs/common";
import { type UserSearchViewModel, type UserViewModel } from "@ascnd-gg/types";
import { UsersService } from "./users.service";
import { Public } from "../auth/auth.decorator";
import type { User } from "@ascnd-gg/database";
import { type Request } from "express";

@Controller("users")
export class UsersController {
  constructor(private readonly userService: UsersService) {}

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
    @Query("teamId") teamId?: string | undefined,
  ): Promise<{
    users: Array<UserSearchViewModel> | null;
    totalCount: number;
  }> {
    const user = req["user"] as User;

    const { users, totalCount } = await this.userService.searchUsersByUsername(
      user,
      username,
      parseInt(page),
      parseInt(limit),
      teamId,
    );

    return { users, totalCount };
  }
}
