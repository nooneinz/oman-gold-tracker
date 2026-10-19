import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { UiStateService } from '../../core/ui-state.service';

interface NavItem {
  href: string;
  icon: 'home' | 'prices' | 'calculator' | 'chart' | 'history' | 'alerts' | 'settings';
  labelKey: string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  readonly sidebarOpen$: Observable<boolean>;

  readonly items: NavItem[] = [
    { href: '#top', icon: 'home', labelKey: 'nav.home' },
    { href: '#prices', icon: 'prices', labelKey: 'nav.prices' },
    { href: '#calculator', icon: 'calculator', labelKey: 'nav.calculator' },
    { href: '#chart', icon: 'chart', labelKey: 'nav.chart' },
    { href: '#history', icon: 'history', labelKey: 'nav.history' },
    { href: '#alerts', icon: 'alerts', labelKey: 'nav.alerts' },
    { href: '#settings', icon: 'settings', labelKey: 'nav.settings' },
  ];

  constructor(private readonly ui: UiStateService) {
    this.sidebarOpen$ = this.ui.sidebarOpen$;
  }

  close(): void {
    this.ui.closeSidebar();
  }
}
