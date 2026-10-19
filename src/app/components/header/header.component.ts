import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ThemeService, ThemeMode } from '../../core/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  readonly theme$: Observable<ThemeMode>;

  readonly links = [
    { href: '#top', label: 'الرئيسية' },
    { href: '#prices', label: 'أسعار الذهب' },
    { href: '#calculator', label: 'حاسبة الذهب' },
    { href: '#chart', label: 'حركة الأسعار' },
    { href: '#history', label: 'سجل الأسعار' },
  ];

  constructor(private readonly themeService: ThemeService) {
    this.theme$ = this.themeService.theme$;
  }

  toggleTheme(): void {
    this.themeService.toggle();
  }
}
