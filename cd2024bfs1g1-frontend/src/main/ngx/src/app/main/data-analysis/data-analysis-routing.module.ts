import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataAnalysisHomeComponent } from './data-analysis-home/data-analysis-home.component';
import { BilledAgeComponent } from './billed-age/billed-age.component';
import { SellsByCategoryComponent } from './sells-by-category/sells-by-category.component';
import { UsersSkinTypesComponent } from './users-skin-types/users-skin-types.component';
import { CustomerAnalysisComponent } from './customer-analysis/customer-analysis.component';

const routes: Routes = [
  {
    path: '',
    component: DataAnalysisHomeComponent
  },
  {
    path: 'billed-age',
    component: BilledAgeComponent
  },
  {
    path: "customer-analysis",
    component: CustomerAnalysisComponent
  },
  {
    path: "bycategory",
    component: SellsByCategoryComponent
  },
  {
    path: "skintypes",
    component: UsersSkinTypesComponent
  },
  {
    path: 'age-range-configuration',
    loadChildren: () => import('./age-range-configuration/age-range-configuration.module').then(m => m.AgeRangeConfigurationModule)
  },
  {
    path: 'products-stats',
    loadChildren: () => import('./products-stats/products-stats.module').then(m => m.ProductsStatsModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataAnalysisRoutingModule { }
