import { Module } from "@nestjs/common";
import { UserService } from "./services/user.service";
import { UserController } from "./controllers/user.controller";
import { AuthModule } from "src/auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { DtoHelperService } from "./dto/dto-helper";

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([User])],
    controllers: [UserController],
    providers: [UserService, DtoHelperService]
})
export class UserModule {}
