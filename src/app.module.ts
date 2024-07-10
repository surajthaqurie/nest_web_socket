import { Module } from "@nestjs/common";
import { GatewayModule } from "./gateway/gateway.module";
import { UserModule } from "./user/user.module";
import { TodoModule } from "./todo/todo.module";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRoot({
            type: "postgres",
            url: process.env.DATABASE_URL,
            autoLoadEntities: true,
            synchronize: true
        }),
        GatewayModule,
        UserModule,
        TodoModule,
        AuthModule
    ],
    controllers: [],
    providers: []
})
export class AppModule {}
