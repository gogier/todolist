/* import form : https://stackblitz.com/edit/angular-pipe-groupby?file=src%2Fapp%2Fgroup-by.pipe.ts*/

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {
  transform(collection: any[], property: string): any[] {
    // prevents the application from breaking if the array of objects doesn't exist yet
    if(!collection) {
        return [];
    }

    collection.sort((a, b) => (a[property] < b[property] ) ? -1 : 1); 

    // this will return an array of objects, each object containing a group of objects
    return collection;
  }
}