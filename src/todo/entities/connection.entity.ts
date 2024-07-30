import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Connection {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    socketId: string;

    // One user has many connections, e.g. one on his desktop and one on mobile
    @ManyToOne(() => User, (user) => user.connections)
    @JoinColumn()
    connectedUser: User;
}
