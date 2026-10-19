import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppComponent } from './app.component';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { ChartComponent } from './components/chart/chart.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeroComponent } from './components/hero/hero.component';
import { HistoryTableComponent } from './components/history-table/history-table.component';
import { PriceCardComponent } from './components/price-card/price-card.component';
import { PriceCardsComponent } from './components/price-cards/price-cards.component';
import { AlertsComponent } from './components/alerts/alerts.component';
import { SettingsComponent } from './components/settings/settings.component';
import { LogoComponent } from './components/logo/logo.component';
import { BottomNavComponent } from './components/bottom-nav/bottom-nav.component';
import { TranslatePipe } from './core/translate.pipe';

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [CommonModule, FormsModule, HttpClientTestingModule],
    declarations: [
      AppComponent,
      CalculatorComponent,
      ChartComponent,
      FooterComponent,
      HeaderComponent,
      SidebarComponent,
      HeroComponent,
      HistoryTableComponent,
      PriceCardComponent,
      PriceCardsComponent,
      AlertsComponent,
      SettingsComponent,
      LogoComponent,
      BottomNavComponent,
      TranslatePipe
    ]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'oman-gold-tracker'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('oman-gold-tracker');
  });

  it('should render the brand and price history section', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-header')).toBeTruthy();
    expect(compiled.textContent).toContain('قيمة الذهب');
    expect(compiled.textContent).toContain('سجل الأسعار');
  });
});
