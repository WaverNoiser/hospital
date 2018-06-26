import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { ProgressComponent } from './progress/progress.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { PAGES_ROUTES } from '../pages/pages.routes';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { DonutComponent } from './donut/donut.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

@NgModule(
    { declarations: [
        DashboardComponent,
        Graficas1Component,
        ProgressComponent,
        PagesComponent,
        IncrementadorComponent,
        DonutComponent,
        AccountSettingsComponent,
        PromesasComponent,
        RxjsComponent
 ],  exports: [
     DashboardComponent,
     Graficas1Component,
     ProgressComponent,
     PagesComponent
  ],
imports: [
    SharedModule,
    PAGES_ROUTES,
    FormsModule,
    ChartsModule

 ]
})

export class PagesModule {}

