import { UnauthorizedException } from "@nestjs/common";
import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { AuthService } from "src/auth/services/auth.service";
import { UserService } from "src/user/services/user.service";
import { UserI } from "src/user/user.interface";
import { ConnectionService } from "../services/connection.service";
import { TodoService } from "../services/todo.service";

@WebSocketGateway({ namespace: "todos", cors: { origin: "*" } })
export class TodoGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    constructor(
        private userService: UserService,
        private authService: AuthService,
        private connectionService: ConnectionService,
        private todoService: TodoService
    ) {}

    async handleConnection(socket: Socket) {
        try {
            // if the token is not verified, this will throw and we can catch and disconnect the user
            const decodedToken = await this.authService.verifyJwt(socket.handshake.auth.Authorization);

            //  if the token is valid, we get the user by id from our database
            const user: UserI = await this.userService.getOneById(decodedToken.payload.user.id);
            if (!user) {
                console.log("Disconnect user");
                return this.disconnect(socket);
            } else {
                console.log("Do something", user);

                // save the connection of the user in our database
                await this.connectionService.createConnection({ socketId: socket.id, connectedUser: user });

                // get all todos from our database
                const todos = await this.todoService.findAll();

                // Only emit todos to the specific connected client
                return this.server.to(socket.id).emit("todos", todos);
            }
        } catch (error) {
            console.log("Disconnect user");
            return this.disconnect(socket);
        }
    }

    async handleDisconnect(socket: Socket) {
        // remove the connection from database
        await this.connectionService.deleteBySocketId(socket.id);
        socket.disconnect();
    }

    private async disconnect(socket: Socket) {
        socket.emit("Error", new UnauthorizedException());
        socket.disconnect();
    }
}
