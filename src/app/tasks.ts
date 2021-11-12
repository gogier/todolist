export interface Task {
  id: string;
  title: string;
  actor: string;
  description: string;
  category: string;
  estimate: string;
  order: number;
}

export const currentTasks = [
  {
    id: '1',
    title: 'My first task',
    actor: 'Guillaume',
    description: 'A large phone with one of the best screens',
    category: 'CAT1',
    estimate: '15m',
    order: 3,
  },
  {
    id: '2',
    title: 'My second action',
    actor: 'Guillaume',
    description: '',
    category: 'CAT1',
    estimate: '1h',
    order: 2,
  },
  {
    id: '3',
    title: 'Another activity',
    actor: 'Someone',
    description: 'This is a new task to do',
    category: 'CAT2',
    estimate: '30m',
    order: 1,
  },
];

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
