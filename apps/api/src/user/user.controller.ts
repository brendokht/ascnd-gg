import { Controller, Get, NotFoundException, Param } from "@nestjs/common";
import { UserViewModel } from "@ascnd-gg/types";
import { UserService } from "./user.service";
import { Public } from "../auth/auth.decorator";

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
}
