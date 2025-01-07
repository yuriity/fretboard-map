import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'fbm-fretbord-toolbar',
  imports: [MatButtonModule, MatToolbarModule, MatIconModule, MatTooltipModule],
  templateUrl: './fretbord-toolbar.component.html',
  styles: ``,
})
export class FretbordToolbarComponent {}
