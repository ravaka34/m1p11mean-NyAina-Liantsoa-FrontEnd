import { Component, DoCheck, Input, OnChanges, OnInit } from '@angular/core';
import { Chart, ChartModule } from 'angular-highcharts';

@Component({
  selector: 'app-chart-line',
  standalone: true,
  imports: [
    ChartModule
  ],
  templateUrl: './chart-line.component.html',
  styleUrl: './chart-line.component.css'
})
export class ChartLineComponent implements OnInit, OnChanges {

  @Input() data!: any;
  @Input() name!: string;
  @Input() x!: any;
  @Input() type!: any;

  chart: Chart = new Chart();

  createChart(){
    this.chart = new Chart({
      chart: {
        type: this.type,
        height: 300
      },
      title: {
        text: ''
      },
      credits: {
        enabled: false
      },
      xAxis: {
        categories: this.x
      },
      series: [{
        name: this.name,
        data: this.data
      } as any]
    });
  }

  ngOnInit(){
    this.createChart();
  }

  ngOnChanges(): void {
    this.createChart();
  }

  
}
