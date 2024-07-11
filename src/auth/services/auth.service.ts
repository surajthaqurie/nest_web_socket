import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserI } from "src/user/user.interface";

import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) {}

    async generateJwt(user: UserI): Promise<string> {
        return this.jwtService.signAsync({ payload: { user } });
    }

    async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }

    async comparePassword(password: string, storedPassword: string): Promise<boolean> {
        return bcrypt.compare(password, storedPassword);
    }

    async verifyJwt(jwt: string): Promise<any> {
        return this.jwtService.verifyAsync(jwt);
    }
}
