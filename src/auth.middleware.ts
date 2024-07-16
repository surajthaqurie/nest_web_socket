import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { AuthService } from "./auth/services/auth.service";
import { UserService } from "./user/services/user.service";
import { UserI } from "./user/user.interface";
import { NextFunction, Response } from "express";

export interface IRequestModel {
    user: UserI;
    headers: any;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(
        private authService: AuthService,
        private userService: UserService
    ) {}

    async use(req: IRequestModel, res: Response, next: NextFunction): Promise<any> {
        try {
            const tokenArray: string[] = req.headers["authorization"].split(" ");

            // throws if the token is not valid
            const decodedToken = await this.authService.verifyJwt(tokenArray[1]);

            // make sure that the user is not delete
            // or that props changed during the time that the jwt was issued to the user
            const user: UserI = await this.userService.getOneById(decodedToken.user.id);

            if (user) {
                // attach the user object to our request object - so we can access it any time later in our application
                // if it would be there, we would overwrite it
                req.user = user;
                next();
            } else {
                throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED);
            }
        } catch (error) {
            throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED);
        }
    }
}
