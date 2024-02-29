import { Component, OnInit } from '@angular/core';
import { BodyComponent } from '../../../component/body/body.component';
import { Chart, ChartModule } from 'angular-highcharts';

@Component({
  selector: 'app-chart-manager',
  standalone: true,
  imports: [
    ChartModule
  ],
  templateUrl: './chart-manager.component.html',
  styleUrl: './chart-manager.component.css'
})
export class ChartManagerComponent extends BodyComponent implements OnInit{

  chart = new Chart({
    chart: {
      type: 'line'
    },
    title: {
      text: 'Linechart'
    },
    credits: {
      enabled: false
    },
    series: [
      {
        name: 'Line 1',
        data: [1, 2, 3]
      } as any
    ]
  });

  ngOnInit(): void {
      this.setPageTitleService();
  }

}
