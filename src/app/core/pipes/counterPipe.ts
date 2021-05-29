import { Pipe, PipeTransform } from "@angular/core";
import { Todo } from "../models/Todo.model";


@Pipe({
    name: 'countTasks',
    pure: false
})

export class counterPipe implements PipeTransform {
    transform(items: Todo[]): number {
        return items.filter((item) => item.done === true).length;
    }
}