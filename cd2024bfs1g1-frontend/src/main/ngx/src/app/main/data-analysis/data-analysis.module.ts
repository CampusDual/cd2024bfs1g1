import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { DataAnalysisRoutingModule } from './data-analysis-routing.module';
import { OChartModule } from 'ontimize-web-ngx-charts';
import { DataAnalysisHomeComponent } from './data-analysis-home/data-analysis-home.component';
import { BilledAgeComponent } from './billed-age/billed-age.component';


@NgModule({
  declarations: [
    DataAnalysisHomeComponent,
    BilledAgeComponent
  ],
  imports: [
    CommonModule,
    DataAnalysisRoutingModule,
    OntimizeWebModule,
    OChartModule
  ]
})
export class DataAnalysisModule { }
