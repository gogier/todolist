export interface Task {
  id: string;
  title: string;
  actor: string;
  description: string;
  categorie: string;
  estimate: string;
  order: number;
}

export const currentTasks = [
  {
    id: '1',
    title: 'My first task',
    actor: 'Guillaume',
    description: 'A large phone with one of the best screens',
    categorie: 'CAT1',
    estimate: '15min',
    order: 3,
  },
  {
    id: '2',
    title: 'My second action',
    actor: 'Guillaume',
    description: '',
    categorie: 'CAT1',
    estimate: '1hour',
    order: 2,
  },
  {
    id: '3',
    title: 'Another activity',
    actor: 'Someone',
    description: 'This is a new task to do',
    categorie: 'CAT2',
    estimate: '30min',
    order: 1,
  },
];

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
