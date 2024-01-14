import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Task } from '../model/tasks';
import { TaskCreationRequest } from '../model/tasks';
import { TaskUpdateRequest } from '../model/tasks';
import { TaskOrderListRequest } from '../model/tasks';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }


  getTasks(archive?: boolean, project?: string): Observable<Task[]> {
    const params = new HttpParams()
      .set('archive', archive ? archive.toString() : '')
      .set('project', project || '');

    return this.http.get<Task[]>(`${this.apiUrl}/tasks`, { params, "headers" : { "access-Control-Allow-Origin" : "*"} });
  }

  getArchivedTasks(project?: string): Observable<Task[]> {
    return this.getTasks(true, project);
  }
  getNotArchivedTasks(project?: string): Observable<Task[]> {
    return this.getTasks(false, project);
  }

  createTask(task: TaskCreationRequest): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}/tasks`, task,{ "headers" : { "access-Control-Allow-Origin" : "*"}});
  }

  getTaskById(taskId: string): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/tasks/${taskId}`,{ "headers" : { "access-Control-Allow-Origin" : "*"}});
  }

  updateTask(taskId: string, updatedTask: TaskUpdateRequest): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/tasks/${taskId}`, updatedTask,{ "headers" : { "access-Control-Allow-Origin" : "*"}});
  }

  updateTaskStatus(taskId: string): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/tasks/${taskId}/status`, {},{ "headers" : { "access-Control-Allow-Origin" : "*"}});
  }

  updateTasksOrder(taskOrderList: String[]): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/tasks/ordering`, taskOrderList,{ "headers" : { "access-Control-Allow-Origin" : "*"}});
  }

  archiveTasks(): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/tasks/archive`, {},{ "headers" : { "access-Control-Allow-Origin" : "*"}});
  }
}
