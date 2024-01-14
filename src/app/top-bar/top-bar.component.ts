import { Component } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Project, ProjectCreationRequest } from '../model/projects';
import { ProjectService } from './top-bar.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent {
  selectedProject: string;
  projects: Project[] = [];
  projectForm: FormGroup;

  constructor(private projectService: ProjectService, private fb: FormBuilder) {
    this.projectForm = this.fb.group({
      projectName: ['', Validators.required],
    });
    this.selectedProject = '';
  }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects() {
    this.projectService.getProjects().subscribe((projects) => {
      this.projects = projects;
    });
  }

  createProject() {
    const projectName = this.projectForm.get('projectName')!.value;
    const newProject: ProjectCreationRequest = { name: projectName };

    this.projectService.createProject(newProject).subscribe((createdProject) => {
      this.projects.push(createdProject);
      // Optionally, you can reset the form here.
    });
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/