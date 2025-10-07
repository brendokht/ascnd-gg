import { Controller, Get, NotFoundException, Param } from "@nestjs/common";
import { UserSearchParameterDto, type UserViewModel } from "@ascnd-gg/types";
import { UsersService } from "./users.service";
import { Public } from "../auth/auth.decorator";

@Controller("users")
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Public()
  @Get(":username")
  async getUserByUsername(
    @Param() params: UserSearchParameterDto,
  ): Promise<UserViewModel> {
    const username: string = params.username;
    const user = await this.userService.getUserByUsername(username);

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }
}
