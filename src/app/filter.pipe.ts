import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
@Injectable()
export class FilterPipe implements PipeTransform {

  transform(items: any[], term: string): any {
        return items.filter(item => item.indexOf(term) !== -1);
    }

}
