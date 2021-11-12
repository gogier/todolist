import { Component } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

import { FormBuilder } from '@angular/forms';
import { currentTasks, Task } from '../tasks';

import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  newTaskForm = this.formBuilder.group({
    title: '',
  });

  updateTaskForm = this.formBuilder.group({
    id: '',
    title: '',
    actor: '',
    description: '',
    category: '',
    estimate: '',
    order: '',
  })

  tasks = currentTasks;

  currentTaskToUpdate: Task = {} as Task;

  /* On init : SORT Task */
  ngOnInit() {
    this.tasks.sort((a, b) => a.order > b.order && 1 || -1);
  }  

  constructor(private formBuilder: FormBuilder) {}



  /* ADD Task Action */
  addToTodoList(): void {
    // Process checkout data here

    console.log('Check RegEx from title value');
    const regexpTask = /(\[.*\])(.*)(\@\w*)/;
    var match = this.newTaskForm.value.title.match(regexpTask);

    var newTaskTitle = this.newTaskForm.value.title;
    var newTaskCategory = '';
    var newTaskActor = '';

    if (match != null) {
      newTaskTitle = match[2];
      newTaskCategory = match[1];
      newTaskActor = match[3];
    }

    var newTaskToCreate = {
      id: uuidv4(),
      title: newTaskTitle,
      actor: newTaskActor,
      description: '',
      category: newTaskCategory,
      estimate: '',
      order: -1,
    };
    console.log(newTaskToCreate);
    this.tasks.unshift(newTaskToCreate);
    this.saveOrder();
    this.newTaskForm.reset();
  }


  /* ORDER Drag & Drop Action */
  drop(event: CdkDragDrop<Task[]>) {
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
    this.saveOrder();
  }

  /* To be able to keep the order define by the user */
  saveOrder() {
    this.tasks.forEach((x,index) => { x.order=index  });
  }

  selectTask(task: Task) {
    this.updateTaskForm.setValue(task);
  }

  updateTask() {

    this.tasks.forEach(item =>{
        if(item.id == this.updateTaskForm.value.id){
          item.title= this.updateTaskForm.value.title;
          item.actor= this.updateTaskForm.value.actor;
          item.description= this.updateTaskForm.value.description;
          item.category= this.updateTaskForm.value.category;
          item.estimate= this.updateTaskForm.value.estimate;          
        }
    });

  }

}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
