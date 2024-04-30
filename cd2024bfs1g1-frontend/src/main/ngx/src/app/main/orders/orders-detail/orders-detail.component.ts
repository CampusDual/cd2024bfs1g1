import { Component } from '@angular/core';

@Component({
  selector: 'app-orders-detail',
  templateUrl: './orders-detail.component.html',
  styleUrls: ['./orders-detail.component.css']
})
export class OrdersDetailComponent {

  public optionSent = [{
    valueSent: true,
    textSent: "SENT"
  },
  {
    valueSent: false,
    textSent: "UNSENT"
  }];

}
