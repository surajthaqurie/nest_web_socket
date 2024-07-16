import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { TodoModule } from "./todo/todo.module";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthMiddleware } from "./auth.middleware";

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRoot({
            type: "postgres",
            url: process.env.DATABASE_URL,
            autoLoadEntities: true,
            synchronize: true
        }),
        UserModule,
        TodoModule,
        AuthModule
    ],
    controllers: [],
    providers: []
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .exclude(
                {
                    path: "/api/v1/users/signup",
                    method: RequestMethod.POST
                },
                {
                    path: "/api/v1/users/login",
                    method: RequestMethod.POST
                }
            )
            .forRoutes({ path: "", method: RequestMethod.ALL });
    }
}
