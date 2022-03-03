/* import form : https://stackblitz.com/edit/angular-pipe-groupby?file=src%2Fapp%2Fgroup-by.pipe.ts*/

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByCallback'
})
export class FilterByCallbackPipe implements PipeTransform {
  transform(items: any[], callback: (item: any) => boolean): any {
    if (!items || !callback) {
        return items;
    }
    return items.filter(item => callback(item));
  }
}