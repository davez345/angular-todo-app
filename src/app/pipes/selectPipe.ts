import { Pipe, PipeTransform } from "@angular/core";
import { Todo } from "../models/Todo.model";


@Pipe({
    name: 'selectFilter',
    pure: false
})

export class selectPipe implements PipeTransform {
    transform(items: Todo[], filter: string): Todo[] {
        if (!items || !filter || filter == "All") {
            return items;
        } else if (filter == "Active") {
            return items.filter(item => item.done == false);
        } else {
            return items.filter(item => item.done == true); 
        }
    }
}