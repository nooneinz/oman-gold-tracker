import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeroComponent } from './components/hero/hero.component';
import { PriceCardsComponent } from './components/price-cards/price-cards.component';
import { PriceCardComponent } from './components/price-card/price-card.component';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { ChartComponent } from './components/chart/chart.component';
import { HistoryTableComponent } from './components/history-table/history-table.component';
import { AlertsComponent } from './components/alerts/alerts.component';
import { SettingsComponent } from './components/settings/settings.component';
import { FooterComponent } from './components/footer/footer.component';
import { LogoComponent } from './components/logo/logo.component';
import { BottomNavComponent } from './components/bottom-nav/bottom-nav.component';
import { TranslatePipe } from './core/translate.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    HeroComponent,
    PriceCardsComponent,
    PriceCardComponent,
    CalculatorComponent,
    ChartComponent,
    HistoryTableComponent,
    AlertsComponent,
    SettingsComponent,
    FooterComponent,
    LogoComponent,
    BottomNavComponent,
    TranslatePipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
