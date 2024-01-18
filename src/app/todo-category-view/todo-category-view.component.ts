import { Component, OnInit } from '@angular/core';
import { TodoListService } from '../todo-list/todo-list.service';
import { ProjectService } from '../shared/project.service';

import {  Task } from '../model/tasks';

@Component({
  selector: 'app-todo-category-view',
  templateUrl: './todo-category-view.component.html',
  styleUrls: ['./todo-category-view.component.css']
})
export class TodoCategoryViewComponent implements OnInit {

  
  selectedProjectId: string = "all";

  tasks : Task[] = [];

  constructor(private todolistService: TodoListService, private projectService: ProjectService) {}


  ngOnInit(): void {
    this.projectService.selectedProjectId$.subscribe((projectId) => {
      if(projectId==null) {
        this.selectedProjectId = "all";
      } else {
        this.selectedProjectId = projectId;
      }
      // Fetch tasks based on the selected project ID
      // You can call your API service method here.
    });

    /* Order tasks by category and priority && a.order > b.order */

    this.loadTasks();
  }
  
  loadTasks() {
    this.tasks = [];
    this.todolistService.getTasks( this.selectedProjectId).subscribe(
        (data: Task[]) => this.tasks = data
          //data.forEach(item => {
          //  if(item.status!=='archive'){              
          //    this.tasks.push(item);
          //  } 
          //})
    );
  }


}
