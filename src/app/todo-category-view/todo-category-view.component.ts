import { Component, OnInit } from '@angular/core';

import { currentTasks, Task } from '../tasks';

@Component({
  selector: 'app-todo-category-view',
  templateUrl: './todo-category-view.component.html',
  styleUrls: ['./todo-category-view.component.css']
})
export class TodoCategoryViewComponent implements OnInit {


  tasks = currentTasks;

  constructor() { }

  ngOnInit(): void {
    /* Order tasks by category and priority */

    /* this.tasks.sort((a, b) => (a.category < b.category && a.order > b.order) && 1 || -1); */

  }
  


}
