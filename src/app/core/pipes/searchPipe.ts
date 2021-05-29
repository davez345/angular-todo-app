import { listLazyRoutes } from "@angular/compiler/src/aot/lazy_routes";
import { Pipe, PipeTransform } from "@angular/core";
import { Todo } from "../models/Todo.model";



@Pipe({
    name: 'searchFilter',
    pure: false
})

export class searchPipe implements PipeTransform {
    transform(items: Todo[], filterTerm: string): Todo[] {
        return items ? items.filter(item => item.title.search(
            RegExp(filterTerm, 'i')) > -1) : [];
    }
}