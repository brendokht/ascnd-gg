import { Controller } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Public } from "./auth.decorator";

@Public()
@Controller("auth")
export class AuthController {
  constructor(private readonly authServer: AuthService) {}
}
