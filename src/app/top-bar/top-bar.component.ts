import { Component } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Project, ProjectCreationRequest } from '../model/projects';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TopBarDialogComponent } from './top-bar-dialog/top-bar-dialog.component';
import { ProjectService } from '../shared/project.service';


@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent {
  selectedProjectId: string;
  projects: Project[] = [];

  constructor(private projectService: ProjectService,public dialog: MatDialog) {
    this.selectedProjectId = '';
  }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects() {
    this.projectService.getProjects().subscribe((projects) => {
      this.projects = projects;

      if(this.projects.length>0) {
        this.selectProject(this.projects[0].id);
      }
    });
  }

  createProject() {

    const dialogRef = this.dialog.open(TopBarDialogComponent, {
      width: '400px', // Set the desired width
      data: {}, // Pass any data to the modal if needed
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Handle the result returned from the modal
        console.log('New project created:', result);
        const newProject: ProjectCreationRequest = { name: result };
        this.projectService.createProject(newProject).subscribe((createdProject) => {
          this.projects.push(createdProject);
          // Optionally, you can reset the form here.
          this.selectProject(createdProject.id);
        });
        // You may want to refresh the project list or update the UI
      }
    });
    
  }

  
  selectProject(projectId: string): void {
    this.projectService.setSelectedProjectId(projectId);
    this.selectedProjectId = projectId;
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/