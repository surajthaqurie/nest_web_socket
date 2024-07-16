import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateUserDto } from "../dto/create-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { Repository } from "typeorm";
import { AuthService } from "src/auth/services/auth.service";
import { LoginResponseI, UserI } from "../user.interface";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private authService: AuthService
    ) {}

    async createUser(newUser: UserI): Promise<UserI> {
        const emailExists = await this.mailExists(newUser.email);
        const usernameExists = await this.usernameExits(newUser.username);

        if (emailExists === false && usernameExists === false) {
            const passwordHash = await this.authService.hashPassword(newUser.password);
            newUser.password = passwordHash;
            newUser.email = newUser.email.toLowerCase();
            newUser.username = newUser.username.toLowerCase();

            const user = await this.userRepository.save(this.userRepository.create(newUser));

            return this.findOne(user.id);
        } else {
            throw new HttpException("Email or username already taken", HttpStatus.CONFLICT);
        }
    }

    private async findOne(id: number): Promise<UserI> {
        return this.userRepository.findOne({ where: { id } });
    }

    private async mailExists(email: string): Promise<boolean> {
        const user = await this.userRepository.findOne({ where: { email } });

        return !!user;
    }

    private async usernameExits(username: string): Promise<boolean> {
        const user = await this.userRepository.findOne({ where: { username } });

        return !!user;
    }

    async loginUser(loginDto: UserI): Promise<string> {
        const foundUser: UserI = await this.findByEmail(loginDto.email);
        if (foundUser) {
            const passwordMatching = await this.authService.comparePassword(loginDto.password, foundUser.password);

            if (passwordMatching == true) {
                const payload = await this.findOne(foundUser.id);
                return this.authService.generateJwt(payload);
            } else {
                throw new HttpException("Login was not success", HttpStatus.UNAUTHORIZED);
            }
        } else {
            throw new HttpException("User not found", HttpStatus.NOT_FOUND);
        }
    }

    private findByEmail(email: string): Promise<UserI> {
        return this.userRepository.findOne({ where: { email }, select: ["id", "email", "username", "password"] });
    }

    async getOneById(id: number): Promise<UserI> {
        return this.userRepository.findOneOrFail({ where: { id } });
    }
}
