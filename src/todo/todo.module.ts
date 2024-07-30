import { Module } from "@nestjs/common";
import { TodoGateway } from "./gateway/todo.gateway";
import { UserModule } from "src/user/user.module";
import { AuthModule } from "src/auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Connection } from "./entities/connection.entity";
import { Todo } from "./entities/todo.entity";
import { TodoService } from "./services/todo.service";
import { ConnectionService } from "./services/connection.service";
import { SetupService } from "./services/setup.service";

@Module({
    imports: [UserModule, AuthModule, TypeOrmModule.forFeature([Connection, Todo])],
    providers: [TodoGateway, TodoService, ConnectionService, SetupService],
    exports: [TodoGateway]
})
export class TodoModule {}
