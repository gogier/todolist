import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Project } from '../model/projects';
import { ProjectCreationRequest } from '../model/projects';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private apiUrl = environment.apiUrl;

  private selectedProjectIdSubject = new BehaviorSubject<string | null>(null);
  selectedProjectId$ = this.selectedProjectIdSubject.asObservable();

  constructor(private http: HttpClient) { }

  setSelectedProjectId(projectId: string | null): void {
    this.selectedProjectIdSubject.next(projectId);
  }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}/projects`, { "headers" : { "access-Control-Allow-Origin" : "*"} });
  }

  createProject(project: ProjectCreationRequest): Observable<Project> {
    return this.http.post<Project>(`${this.apiUrl}/projects`, project,{ "headers" : { "access-Control-Allow-Origin" : "*"}});
  }
}
