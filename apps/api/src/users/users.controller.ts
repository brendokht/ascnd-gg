import { Controller, Get, NotFoundException, Param } from "@nestjs/common";
import {
  UserSearchParameterDto,
  UserIdParameterDto,
  type UserViewModel,
} from "@ascnd-gg/types";
import { UsersService } from "./users.service";
import { Public } from "../auth/auth.decorator";

@Controller("users")
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Public()
  @Get("/:id")
  async getUserById(
    @Param() params: UserIdParameterDto,
  ): Promise<UserViewModel> {
    const user = await this.userService.getUserById(params);

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  @Public()
  @Get("/slug/:username")
  async getUserByUsername(
    @Param() params: UserSearchParameterDto,
  ): Promise<UserViewModel> {
    const user = await this.userService.getUserByUsername(params);

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }
}
