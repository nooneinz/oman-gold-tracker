import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ThemeService, ThemeMode } from '../../core/theme.service';
import { I18nService, Lang } from '../../core/i18n.service';
import { AlertsService } from '../../core/alerts.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
})
export class SettingsComponent {
  theme$: Observable<ThemeMode>;
  lang$: Observable<Lang>;
  cleared = false;

  constructor(
    private readonly themeService: ThemeService,
    private readonly i18nService: I18nService,
    private readonly alertsService: AlertsService
  ) {
    this.theme$ = this.themeService.theme$;
    this.lang$ = this.i18nService.lang$;
  }

  setTheme(mode: ThemeMode): void {
    this.themeService.set(mode);
  }

  setLang(lang: Lang): void {
    this.i18nService.set(lang);
  }

  clearAlerts(): void {
    this.alertsService.clearAll();
    this.cleared = true;
    setTimeout(() => (this.cleared = false), 2500);
  }
}
