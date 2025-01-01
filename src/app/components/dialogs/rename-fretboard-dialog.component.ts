import { Component, inject } from '@angular/core';
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
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { FretboardsAccordionComponent } from '../fretboards-accordion/fretboards-accordion.component';

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
  readonly dialogRef = inject(MatDialogRef<FretboardsAccordionComponent>);
  readonly data = inject<RenameFretboardDialogData>(MAT_DIALOG_DATA);

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
