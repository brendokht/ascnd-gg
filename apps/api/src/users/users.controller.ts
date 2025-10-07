import { Controller, Get, NotFoundException, Param } from "@nestjs/common";
import { type UserViewModel } from "@ascnd-gg/types";
import { UsersService } from "./users.service";
import { Public } from "../auth/auth.decorator";

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
}
