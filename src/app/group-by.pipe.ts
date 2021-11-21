/* import form : https://stackblitz.com/edit/angular-pipe-groupby?file=src%2Fapp%2Fgroup-by.pipe.ts*/

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'groupBy'
})
export class GroupByPipe implements PipeTransform {
  transform(collection: any[], property: string): any[] {
    // prevents the application from breaking if the array of objects doesn't exist yet
    if(!collection) {
        return [];
    }

    const groupedCollection = collection.reduce((previous, current)=> {
        if(!previous[current[property]]) {
            previous[current[property]] = [current];
        } else {
            previous[current[property]].push(current);
        }

        return previous;
    }, {});

    var result = Object.keys(groupedCollection).map(key => ({ key, value: groupedCollection[key] }))

    //console.log(result);
    // this will return an array of objects, each object containing a group of objects
    return result;
  }
}