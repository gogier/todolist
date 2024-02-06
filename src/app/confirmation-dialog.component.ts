// confirmation-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  template: `
    <h2 mat-dialog-title>{{ title }}</h2>
    <mat-dialog-content>{{ message }}</mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button mat-dialog-close color="primary">Cancel</button>
      <button mat-button [mat-dialog-close]="true" color="warn">Confirm</button>
    </mat-dialog-actions>
  `,
})
export class ConfirmationDialogComponent {
  message: string='';
  title: string='';
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; message: string }
  ) {}

  
  ngOnInit() {
    this.message = this.data.message;
    this.title = this.data.title;
  }
}
