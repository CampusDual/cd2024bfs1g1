import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsHomeComponent } from './products-home/products-home.component';
import { ProductsNewComponent } from './products-new/products-new.component';
import { ProductsDetailComponent } from './products-detail/products-detail.component';

const routes: Routes = [{
  path: '',
  component: ProductsHomeComponent
},
{
  path: ':PRO_ID',
  component: ProductsDetailComponent
},
{
  path: "new",
  component: ProductsNewComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
