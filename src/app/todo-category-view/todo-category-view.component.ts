import { Component, OnInit } from '@angular/core';
import { TodoListService } from '../todo-list/todo-list.service';

import {  Task } from '../tasks';

@Component({
  selector: 'app-todo-category-view',
  templateUrl: './todo-category-view.component.html',
  styleUrls: ['./todo-category-view.component.css']
})
export class TodoCategoryViewComponent implements OnInit {


  tasks : Task[] = [];

  constructor(private todolistService: TodoListService) {}


  ngOnInit(): void {
    /* Order tasks by category and priority && a.order > b.order */

    this.loadTasks();
    this.tasks.sort((a, b) => (a.category < b.category ) ? 1 : -1); 
  }
  
  loadTasks() {
    this.tasks = [];
    this.todolistService.getTasks().subscribe(
        (data: Task[]) => this.tasks = data
          //data.forEach(item => {
          //  if(item.status!=='archive'){              
          //    this.tasks.push(item);
          //  } 
          //})
    );
  }


}
