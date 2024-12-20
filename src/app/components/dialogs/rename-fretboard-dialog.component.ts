import { Component, inject, model } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { FretboardsComponent } from '../fretboards/fretboards.component';

export interface RenameFretboardDialogData {
  newTitle: string;
  usedTitles: string[];
}

@Component({
  selector: 'fbm-rename-fretboard-dialog',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    ReactiveFormsModule,
  ],
  templateUrl: './rename-fretboard-dialog.component.html',
  styles: ``,
})
export class RenameFretboardDialogComponent {
  readonly dialogRef = inject(MatDialogRef<FretboardsComponent>);
  readonly data = inject<RenameFretboardDialogData>(MAT_DIALOG_DATA);
  // readonly newTitle = model(this.data.newTitle);
  titleFormControl = new FormControl(this.data.newTitle, [
    Validators.required,
    this.titleUniqueValidator.bind(this),
  ]);

  titleUniqueValidator(control: AbstractControl): ValidationErrors | null {
    const isUnique = !this.data.usedTitles.includes(control.value);
    return isUnique ? null : { notUnique: true };
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
