import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { Expression, FilterExpressionUtils, OntimizeService } from 'ontimize-web-ngx';
import { PieChartConfiguration } from 'ontimize-web-ngx-charts';


@Component({
  selector: 'app-sells-by-category',
  templateUrl: './sells-by-category.component.html',
  styleUrls: ['./sells-by-category.component.css']
})

export class SellsByCategoryComponent {

  data: any []; 
  service: OntimizeService;
  pieParameters: PieChartConfiguration;
  colors = {};

  constructor(
    protected injector: Injector,
  ) {
    this._pieConfiguration();
    this.service = this.injector.get(OntimizeService);
  }

  _pieConfiguration(){
    this.pieParameters = new PieChartConfiguration();
    this.pieParameters.showLeyend = true;
    this.pieParameters.legendPosition = 'right';
    this.colors = {
      domain: ['#31d4f8', '#2aaecb', '#1f6e9a', '#154865', '#0499ec', '#03649b', '#03649b']
    };
    }
    
  loadChart(event: any) {
    const groupedData = event.reduce((acc, item) => {
      if (!acc[item.CAT_NAME]) {
        acc[item.CAT_NAME] = 0;
      }
      acc[item.CAT_NAME] += item.TOTAL_SOLD;
      return acc;
    }, {});

    this.data = Object.keys(groupedData).map(key => {
      return {
        name: key,
        value: groupedData[key]
      };
    });
  }

  filter(values: Array<{ attr, value }>): Expression {
    let filters: Array<Expression> = [];
    values.forEach(fil => {
      if (fil.value) {
        if (fil.attr == 'ORD_DATE') {
          filters.push(FilterExpressionUtils.buildExpressionMoreEqual(fil.attr, fil.value.startDate.toDate()));
          filters.push(FilterExpressionUtils.buildExpressionLessEqual(fil.attr, fil.value.endDate.toDate()));
        }
      }
    });

    if (filters.length > 0) {
      return filters.reduce((exp1, exp2) => FilterExpressionUtils.buildComplexExpression(exp1, exp2, FilterExpressionUtils.OP_AND));
    } else {
      return null;
    }
  }

}
