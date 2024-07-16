import { UnauthorizedException } from "@nestjs/common";
import { OnGatewayConnection, SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";
import { Socket } from "socket.io";
import { AuthService } from "src/auth/services/auth.service";
import { UserService } from "src/user/services/user.service";
import { UserI } from "src/user/user.interface";

@WebSocketGateway({ namespace: "todos" })
export class TodoGateway implements OnGatewayConnection {
    constructor(
        private userService: UserService,
        private authService: AuthService
    ) {}

    async handleConnection(socket: Socket) {
        try {
            // if the token is not verified, this will throw and we can catch and disconnect the user
            const decodedToken = await this.authService.verifyJwt(socket.handshake.headers.authorization);

            //  if the token is valid, we get the user by id from our database
            const user: UserI = await this.userService.getOneById(decodedToken.payload.user.id);
            if (!user) {
                console.log("Disconnect user");
                return this.disconnect(socket);
            } else {
                console.log("Do something", user);
            }
        } catch (error) {
            console.log("Disconnect user");
            return this.disconnect(socket);
        }
    }

    private async disconnect(socket: Socket) {
        socket.emit("Error", new UnauthorizedException());
        socket.disconnect();
    }
}
