import { Component } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Project, ProjectCreationRequest } from '../model/projects';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TopBarDialogComponent } from './top-bar-dialog/top-bar-dialog.component';
import { ProjectService } from '../shared/project.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog.component';


@Component({ 
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent {
  selectedProject: Project;
  allProjectsElement: Project={ 'id':'all', 'name': 'All projects', 'selected': false};
  projects: Project[] = [];

  constructor(private projectService: ProjectService,public dialog: MatDialog) {
    this.selectedProject = this.allProjectsElement;
  }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects() {
    this.projectService.getProjects().subscribe((projects) => {
      

      
      var currentSelectedProject = projects.find((project) => project.selected === true);
      if(currentSelectedProject != undefined) {
        this.selectProject(currentSelectedProject);
      } else {
        this.allProjectsElement.selected=true;
        this.selectProject(this.allProjectsElement);
      }
      
      projects.unshift(this.allProjectsElement);
      this.projects = projects;
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
          this.selectProject(createdProject);
        });
        // You may want to refresh the project list or update the UI
      }
    });
    
  }

  
  selectProject(project: Project): void {
    
    this.projectService.selectProject(project.id).subscribe(() => {
  
      this.projectService.setSelectedProjectId(project.id);
      this.selectedProject = project;
            
    });
  }
  
  askForProjectDeletionValidation(projectId: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { title: 'Confirmation', message: 'Are you sure you want to delete this project ?' }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // User confirmed deletion
        this.deleteProject(projectId);
      }
    });
  }

  deleteProject(projectId: string): void {

    this.projectService.deleteProject(projectId).subscribe(() => {
  
      const projectToDelete = this.findProjectById(projectId);

      if (projectToDelete) {
        const index = this.projects.indexOf(projectToDelete);
        if (index !== -1) {
          this.projects.splice(index, 1);
        }
      } 
      
      this.selectProject(this.allProjectsElement);
            
    });

  }

  findProjectById(projectId: string): any {
    return this.projects.find((project) => project.id === projectId);
  }
  
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/