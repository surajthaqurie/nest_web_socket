import { Module } from "@nestjs/common";
import { GatewayModule } from "./gateway/gateway.module";
import { UserModule } from "./user/user.module";
import { TodoModule } from "./todo/todo.module";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "@nestjs/config";

@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true }), GatewayModule, UserModule, TodoModule, AuthModule],
    controllers: [],
    providers: []
})
export class AppModule {}
