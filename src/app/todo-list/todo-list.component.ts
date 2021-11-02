import { Component } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

import { FormBuilder } from '@angular/forms';
import { currentTasks, Task } from '../tasks';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  newTaskForm = this.formBuilder.group({
    title: '',
  });

  tasks = currentTasks;

  ngOnInit() {
    this.tasks.sort((a, b) => a.order > b.order && 1 || -1);
  }  

  constructor(private formBuilder: FormBuilder) {}

  share() {
    window.alert('The task has been shared!');
  }

  addToTodoList(): void {
    // Process checkout data here
    this.tasks.push(this.newTaskForm.value);
    console.warn('Your item has been submitted', this.newTaskForm.value);
    this.newTaskForm.reset();
  }

  drop(event: CdkDragDrop<Task[]>) {
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
    this.saveOrder();
  }

  saveOrder() {
    this.tasks.forEach((x,index) => { x.order=index  });
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
