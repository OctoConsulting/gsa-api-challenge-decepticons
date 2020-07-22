import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTableModule} from '@angular/material/table';
import {MatRippleModule} from '@angular/material/core';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from './services/api-service.service';
import { FileSaverService } from './services/file-saver.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { GoogleChartsModule } from 'angular-google-charts';
import { GeochartComponent } from './geochart/geochart.component';
import { FiltersComponent } from './filters/filters.component';
import { PiechartComponent } from './piechart/piechart.component';
import { MainStepperComponent } from './main-stepper/main-stepper.component';
import { BarchartComponent } from './barchart/barchart.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { MapComponent } from './map/map.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { TablechartComponent } from './tablechart/tablechart.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'statistics',
        component: StatisticsComponent
      },
      {
        path: 'map',
        component: MapComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    HomeComponent,
    GeochartComponent,
    FiltersComponent,
    PiechartComponent,
    MainStepperComponent,
    BarchartComponent,
    StatisticsComponent,
    MapComponent,
    DashboardComponent,
    TablechartComponent
  ],
  imports: [
    HttpClientModule,
    FontAwesomeModule,
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    GoogleChartsModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatProgressBarModule,
    MatTabsModule,
    MatStepperModule,
    MatTableModule,
    MatRippleModule
  ],
  providers: [
    ApiService,
    FileSaverService
  ]
})
export class DashboardModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far);
  }
 }
