import { UserI } from "src/user/user.interface";

export type Status = "BACKLOG" | "TODO" | "DONE";
export type Complexity = "EASY" | "MEDIUM" | "HARD";

export interface TodoItem {
    id?: number;
    createdBy?: UserI;
    updatedBy?: UserI;
    createdAt?: Date;
    updatedAt?: Date;

    status: Status;
    title: string;
    subTitle: string;
    text: string;
    complexity: Complexity;
}

export interface ConnectionI {
    id?: number;
    socketId?: string;
    connectedUser?: UserI;
}
