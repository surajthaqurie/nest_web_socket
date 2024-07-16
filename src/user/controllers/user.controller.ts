import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { UserService } from "../services/user.service";
import { CreateUserDto } from "../dto/create-user.dto";
import { DtoHelperService } from "../dto/dto-helper";
import { LoginResponseI, UserI } from "../user.interface";
import { LoginUserDto } from "../dto/login-user.dto";
import { ConfigService } from "@nestjs/config";

@Controller("users")
export class UserController {
    constructor(
        private readonly userService: UserService,
        private dtoHelperService: DtoHelperService,
        private configService: ConfigService
    ) {}

    @Post("signup")
    async createUser(@Body() createUserDto: CreateUserDto): Promise<UserI> {
        const userEntity: UserI = this.dtoHelperService.createUserDtoToEntity(createUserDto);

        return this.userService.createUser(userEntity);
    }

    @Post("login")
    async loginUser(@Body() loginUserDto: LoginUserDto): Promise<LoginResponseI> {
        const loginEntity: UserI = this.dtoHelperService.loginUserDtoToEntity(loginUserDto);

        const jwt = await this.userService.loginUser(loginEntity);
        return {
            access_token: jwt,
            token_type: "JWT",
            expires_in: this.configService.get("JWT_EXPIRES")
        };
    }
}
