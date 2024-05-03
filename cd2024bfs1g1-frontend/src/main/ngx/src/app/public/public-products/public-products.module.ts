import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { PublicProductsRoutingModule } from './public-products-routing.module';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductsViewComponent } from './products-view/products-view.component';


@NgModule({
  declarations: [
    ProductDetailComponent,
    ProductsViewComponent,
  ],
  imports: [
    CommonModule,
    PublicProductsRoutingModule,
    OntimizeWebModule,
  ]
})
export class PublicProductsModule { }
