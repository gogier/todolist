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


  getTasks(projectId: string, archive?: boolean): Observable<Task[]> {
    const params = new HttpParams()
      .set('archive', archive!=null ? archive.toString() : '')
      .set('projectId', projectId || '');

    return this.http.get<Task[]>(`${this.apiUrl}/projects/${projectId}/tasks`, { params, "headers" : { "access-Control-Allow-Origin" : "*"} });
  }

  getArchivedTasks(projectId: string): Observable<Task[]> {
    return this.getTasks(projectId, true);
  }
  getNotArchivedTasks(projectId: string): Observable<Task[]> {
    return this.getTasks(projectId, false);
  }

  createTask(projectId: string, task: TaskCreationRequest): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}/projects/${projectId}/tasks`, task,{ "headers" : { "access-Control-Allow-Origin" : "*"}});
  }

  getTaskById(projectId: string, taskId: string): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/projects/${projectId}/tasks/${taskId}`,{ "headers" : { "access-Control-Allow-Origin" : "*"}});
  }

  updateTask(projectId: string, taskId: string, updatedTask: TaskUpdateRequest): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/projects/${projectId}/tasks/${taskId}`, updatedTask,{ "headers" : { "access-Control-Allow-Origin" : "*"}});
  }

  updateTaskStatus(projectId: string, taskId: string): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/projects/${projectId}/tasks/${taskId}/status`, {},{ "headers" : { "access-Control-Allow-Origin" : "*"}});
  }

  updateTasksOrder(projectId: string, taskOrderList: String[]): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/projects/${projectId}/tasks/ordering`, taskOrderList,{ "headers" : { "access-Control-Allow-Origin" : "*"}});
  }

  archiveTasks(projectId: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/projects/${projectId}/tasks/archive`, {},{ "headers" : { "access-Control-Allow-Origin" : "*"}});
  }
}
