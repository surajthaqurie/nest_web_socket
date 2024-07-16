import { Module } from "@nestjs/common";
import { TodoGateway } from "./todo.gateway";
import { UserModule } from "src/user/user.module";
import { AuthModule } from "src/auth/auth.module";

@Module({
    imports: [UserModule, AuthModule],
    providers: [TodoGateway],
    exports: [TodoGateway]
})
export class TodoModule {}
