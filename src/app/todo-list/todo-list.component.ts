import { Component , OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

import { FormBuilder } from '@angular/forms';
import { Task } from '../model/tasks';
import { TodoListService } from './todo-list.service';
import { ProjectService } from '../shared/project.service';

import { configUser, configApp } from '../../config/config';
import { TaskCreationRequest } from '../model/tasks';
import { TaskUpdateRequest } from '../model/tasks';
import { TaskOrderListRequest } from '../model/tasks';
import { TaskStatus } from '../model/tasks';


import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
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
    status:'',
    orderInList: 0,
    creationDate: null,
    updateDate: null,
    startDate: null,
    endDate: null,
  })

  tasks:Task[] = [];
  archivedTasks:Task[] = [];

  nbActiveTasks = 0;

  currentTaskToUpdate: Task = {} as Task;

  selectedProjectId: string = "all";

  /* On init : SORT Task */
  ngOnInit() {

    this.projectService.selectedProjectId$.subscribe((projectId) => {
      if(projectId==null) {
        this.selectedProjectId = "all";
      } else {
        this.selectedProjectId = projectId;
      }

      
      this.loadTasks();
      // Fetch tasks based on the selected project ID
      // You can call your API service method here.
    });

  }  

  constructor(private formBuilder: FormBuilder, private todolistService: TodoListService, private projectService: ProjectService) {}



  // Method to add a new task at the beginning of the list
  addNewTask() {
    
    if(this.newTaskForm.get('title')==null) return;

    const newTaskRequest: TaskCreationRequest = {
      title: this.newTaskForm.get('title')!.value,
      actor: configUser.username,
      description: '', // Provide a default value or adjust as needed
      project: '', // Provide a default value or adjust as needed
      estimate: '' // Provide a default value or adjust as needed
    };

    this.todolistService.createTask(this.selectedProjectId, newTaskRequest).subscribe(
      (newTask) => {
        this.tasks.unshift(newTask); // Add the new task at the beginning of the list
        this.newTaskForm.reset(); // Reset the form after adding the task
      },
      (error) => {
        // Handle error if needed
        console.error('Error creating a new task:', error);
      }
    );
  }



  /* ORDER Drag & Drop Action */
  drop(event: CdkDragDrop<Task[]>) {
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);

    this.updateTasksOrder();
    

    this.selectTask(this.tasks[event.currentIndex]);
  }

  updateTasksOrder() {
    // Update the order on the server side (optional)
    const taskOrderList:String[] = this.tasks.map(task => task.id);

    this.todolistService.updateTasksOrder(this.selectedProjectId, taskOrderList).subscribe(
      () => {
        console.log('Order updated on the server side.');
      },
      (error) => {
        // Handle error if needed
        console.error('Error updating order on the server side:', error);
      }
    );
    
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
          item.status= this.updateTaskForm.value.status;
          item.estimate= this.updateTaskForm.value.estimate; 
          item.updateDate= new Date();

          this.saveTask(item);
        }
    });

    this.archivedTasks.forEach(item =>{
      if(item.id == this.updateTaskForm.value.id){
        item.title= this.updateTaskForm.value.title;
        item.actor= this.updateTaskForm.value.actor;
        item.description= this.updateTaskForm.value.description;
        item.category= this.updateTaskForm.value.category;
        item.status= this.updateTaskForm.value.status;
        item.estimate= this.updateTaskForm.value.estimate; 
        item.updateDate= new Date();

        this.saveTask(item);
      }
  });

  }


  changeTaskStatus(task: Task) { 
    const archiveTaskStatusUpdate = (task.status == TaskStatus.Archived);
    this.todolistService.updateTaskStatus(this.selectedProjectId, task.id).subscribe(
      (updatedTask) => {
        if(archiveTaskStatusUpdate) {

          // Find the index of the task in the tasks array
          const taskIndex = this.archivedTasks.findIndex(t => t.id === updatedTask.id);

          if (taskIndex !== -1) {
            // Update the task in the tasks array with the updated task
            this.archivedTasks[taskIndex] = { ...this.archivedTasks[taskIndex], ...updatedTask };
            this.tasks.push(this.archivedTasks[taskIndex]);
            this.archivedTasks.splice(taskIndex, 1);

            this.updateTasksOrder();
            this.nbActiveTasks++;
          }


        } else {

          // Find the index of the task in the tasks array
          const taskIndex = this.tasks.findIndex(t => t.id === updatedTask.id);

          if (taskIndex !== -1) {
            // Update the task in the tasks array with the updated task
            this.tasks[taskIndex] = { ...this.tasks[taskIndex], ...updatedTask };
            
            if(updatedTask.status==TaskStatus.Done) {
              this.nbActiveTasks--;
            }
          }

        }



        console.log(`Task ${task.id} status changed to ${updatedTask.status}`);
      },
      (error) => {
        // Handle error if needed
        console.error('Error updating status on the server side:', error);
      }
    );
  }

  getIconClassFromStatus(status: string) {
    if(status==TaskStatus.Done) {
      return 'task_alt';
    } else if(status==TaskStatus.InProgress) {
      return 'autorenew';
    }
    //else todo
    return 'panorama_fish_eye';
  }

  getActorColorClass(task :Task) {
    //console.log(task.actor);
    if(task.actor==configUser.username) {
      return "user-actor-button"
    } else {
      return "";
    }
  }

  getLineStatusClass(task: Task) {

    
    if(task.status==TaskStatus.Archived) {
      return "archive-format"
    } else if(task.status==TaskStatus.Done) {
      return "done-format"
    } else if(task.status==TaskStatus.InProgress) {
      return "in-progress-format";
    } else {
      return "";
    }

  }



  loadTasks() {
    this.tasks = [];
    this.archivedTasks = [];
    var countActiveTasks = 0;
    
    this.todolistService.getNotArchivedTasks(this.selectedProjectId).subscribe(
        (data: Task[]) => {
          data.forEach(item =>{
              this.tasks.push(item);
              if(item.status==TaskStatus.ToDo||item.status==TaskStatus.InProgress){
                countActiveTasks++ ;
              }
              
              
          });
          this.nbActiveTasks = countActiveTasks;
        }
    );      
    this.todolistService.getArchivedTasks(this.selectedProjectId).subscribe(
      (data: Task[]) => 
        data.forEach(item =>{
            this.archivedTasks.push(item);
        })
  );        
  }

  saveTask(task: Task) {
    this.todolistService.updateTask(this.selectedProjectId, task.id, task).subscribe();
  }
  

  archiveTasks() {
    this.todolistService.archiveTasks(this.selectedProjectId).subscribe(
      () => {
        console.log('Status updated on the server side.');
        
        this.loadTasks();
      },
      (error) => {
        // Handle error if needed
        console.error('Error updating status on the server side:', error);
      }
    );
    
  }

  isNonArchiveTask(item : Task) {
    return item.status != TaskStatus.Archived;
  }
  isArchiveTask(item : Task) {
    return item.status === TaskStatus.Archived;
  }


}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
