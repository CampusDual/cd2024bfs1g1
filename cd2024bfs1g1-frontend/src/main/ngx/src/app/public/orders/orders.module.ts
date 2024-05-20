import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { NewOrderComponent } from './new-order/new-order.component';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { NewOrderDetailsComponent } from './new-order-details/new-order-details.component';
import { CartModule } from '../cart/cart.module';
import { OrdersHistoryComponent } from './orders-history/orders-history.component';


@NgModule({
  declarations: [
    NewOrderComponent,
    NewOrderDetailsComponent,
    OrdersHistoryComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    OntimizeWebModule,
    CartModule
  ]
})
export class OrdersModule { }
