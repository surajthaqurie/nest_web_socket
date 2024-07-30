import { InjectRepository } from "@nestjs/typeorm";
import { Connection } from "../entities/connection.entity";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { ConnectionI } from "../todo.interface";

@Injectable()
export class ConnectionService {
    constructor(@InjectRepository(Connection) private readonly connectionRepo: Repository<Connection>) {}

    async createConnection(connection: ConnectionI): Promise<ConnectionI> {
        return this.connectionRepo.save(connection);
    }

    async findByUserId(userId: number): Promise<ConnectionI[]> {
        return this.connectionRepo.find({
            where: {
                connectedUser: {
                    id: userId
                }
            }
        });
    }

    async deleteBySocketId(socketId: string) {
        return this.connectionRepo.delete({ socketId });
    }

    async deleteAll() {
        await this.connectionRepo.createQueryBuilder().delete().execute();
    }
}
