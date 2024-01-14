import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Project } from '../model/projects';
import { ProjectCreationRequest } from '../model/projects';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }


  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}/projects`, { "headers" : { "access-Control-Allow-Origin" : "*"} });
  }

  createProject(project: ProjectCreationRequest): Observable<Project> {
    return this.http.post<Project>(`${this.apiUrl}/projects`, project,{ "headers" : { "access-Control-Allow-Origin" : "*"}});
  }

}
