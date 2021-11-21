import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Task } from '../tasks';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  constructor(private http: HttpClient) { }

  public getTasks() : Observable<Array<Task>> {
    return this.http.get<Array<Task>>("http://localhost:3000/api/tasks", { "headers" : { "access-Control-Allow-Origin" : "*"}});
  }

  public updateTask(task: Task) : Observable<Task>  {
    return this.http.put<Task>("http://localhost:3000/api/tasks/" + task.id, task,{ "headers" : { "access-Control-Allow-Origin" : "*"}});
  }
}
