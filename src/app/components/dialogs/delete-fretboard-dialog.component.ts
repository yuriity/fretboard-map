import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

export interface DeleteFretboardDialogData {
  title: string;
}

@Component({
  selector: 'fbm-delete-fretboard-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './delete-fretboard-dialog.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteFretboardDialogComponent {
  readonly dialogRef = inject(
    MatDialogRef<DeleteFretboardDialogComponent, boolean>
  );
  readonly data = inject<DeleteFretboardDialogData>(MAT_DIALOG_DATA);

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
