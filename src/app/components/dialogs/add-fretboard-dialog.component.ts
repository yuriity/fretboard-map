import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NoteNames } from '../../models/notes';
import { ScaleFormulas } from '../../models/scale-formulas';
import { AppComponent } from '../../app.component';

export interface CreateFretboardDialogData {
  newTitle: string;
  usedTitles: string[];
}

@Component({
  selector: 'fbm-add-fretboard-dialog',
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
    MatSelectModule,
  ],
  templateUrl: './add-fretboard-dialog.component.html',
  styles: `
    .dialog-content {
      display: grid;
      gap: 1rem;
    }

    mat-form-field {
      width: 100%;
    }
  `,
})
export class AddFretboardDialogComponent {
  readonly dialogRef = inject(MatDialogRef<AppComponent>);
  readonly data = inject<CreateFretboardDialogData>(MAT_DIALOG_DATA);

  titleFormControl = new FormControl(this.data.newTitle, [
    Validators.required,
    this.titleUniqueValidator.bind(this),
  ]);

  readonly noteNames = Array.from(NoteNames);
  readonly scaleNames = Object.keys(ScaleFormulas);

  rootNoteControl = new FormControl('C', [Validators.required]);
  scaleControl = new FormControl(this.scaleNames[0], [Validators.required]);

  get dialogResult() {
    return {
      title: this.titleFormControl.value,
      rootNoteName: this.rootNoteControl.value,
      scale: this.scaleControl.value,
    };
  }

  titleUniqueValidator(control: AbstractControl): ValidationErrors | null {
    const isUnique = !this.data.usedTitles.includes(control.value);
    return isUnique ? null : { notUnique: true };
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
