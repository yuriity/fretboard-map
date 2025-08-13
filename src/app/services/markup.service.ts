import {Injectable, inject} from '@angular/core';

import {SettingsService} from './settings.service';

@Injectable({
  providedIn: 'root',
})
export class MarkupService {
  private settings = inject(SettingsService);
}
