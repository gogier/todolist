import { Component, Inject } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-top-bar-dialog',
  templateUrl: './top-bar-dialog.component.html',
  styleUrls: ['./top-bar-dialog.component.css']
})
export class TopBarDialogComponent {
  projectNameFormControl = new FormControl('', [Validators.required]);

  constructor(
    public dialogRef: MatDialogRef<TopBarDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  createProject(): void {
    console.log("Project Name : " + this.projectNameFormControl.value)
    // Handle project creation logic here
    // You can use this.projectName to access the entered project name
    this.dialogRef.close(this.projectNameFormControl.value);
  }
  nothing(): void {}
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/