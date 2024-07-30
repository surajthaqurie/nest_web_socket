import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { TodoService } from "./todo.service";
import { TodoItem } from "../todo.interface";

@Injectable()
export class SetupService implements OnApplicationBootstrap {
    constructor(private todoService: TodoService) {}

    onApplicationBootstrap() {
        const todoItems: TodoItem[] = [
            {
                title: "Hard Items",
                complexity: "HARD",
                subTitle: "Hard Subtitle",
                text: "Hard Text",
                status: "BACKLOG"
            },
            {
                title: "Easy Items",
                complexity: "EASY",
                subTitle: "Easy Subtitle",
                text: "Easy Text",
                status: "DONE"
            },
            {
                title: "Medium Items",
                complexity: "MEDIUM",
                subTitle: "Medium Subtitle",
                text: "Medium Text",
                status: "TODO"
            }
        ];

        this.todoService.saveAll(todoItems);
    }
}
