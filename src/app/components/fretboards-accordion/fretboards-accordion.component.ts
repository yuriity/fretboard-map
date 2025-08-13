import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { SettingsService } from '../../services/settings.service';
import { RenameFretboardDialogComponent } from '../dialogs/rename-fretboard-dialog.component';
import { DeleteFretboardDialogComponent } from '../dialogs/delete-fretboard-dialog.component';
import { FretboardSettings } from '../../models/fretboard-settings';
import { FretboardCardComponent } from '../fretboard-card/fretboard-card.component';

@Component({
  selector: 'fbm-fretboard-accordion',
  imports: [
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatTooltipModule,
    FretboardCardComponent,
  ],
  templateUrl: './fretboards-accordion.component.html',
  styles: `
    .accordion-headers-align .mat-expansion-panel-header-description {
      justify-content: space-between;
      align-items: center;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FretboardsAccordionComponent {
  readonly dialog = inject(MatDialog);

  public settings = inject(SettingsService);

  openRenameFretboardDialog(fretboard: FretboardSettings): void {
    const dialogRef = this.dialog.open<
      RenameFretboardDialogComponent,
      {newTitle: string; usedTitles: string[]},
      string
    >(RenameFretboardDialogComponent, {
      data: {
        newTitle: fretboard.title(),
        usedTitles: this.settings.fretboards().map(fretboard => fretboard.title()),
      },
    });

    dialogRef.afterClosed().subscribe(newTitle => {
      if (newTitle !== undefined) {
        fretboard.title.set(newTitle);
      }
    });
  }

  openDeleteFretboardDialog(fretboard: FretboardSettings): void {
    const dialogRef = this.dialog.open<DeleteFretboardDialogComponent, {title: string}, boolean>(
      DeleteFretboardDialogComponent,
      {
        data: {title: fretboard.title()},
      },
    );

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.settings.removeFretboard(fretboard.id);
      }
    });
  }
}
