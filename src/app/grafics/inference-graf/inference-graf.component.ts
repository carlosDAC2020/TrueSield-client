import { Component, ViewChild  } from '@angular/core';
import { ChartComponent } from "ng-apexcharts";
import {NgApexchartsModule} from "ng-apexcharts"

import {ApexNonAxisChartSeries, ApexResponsive, ApexChart, ApexDataLabels} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  // Agregar la propiedad dataLabels a la interfaz
  dataLabels?: ApexDataLabels;
};

@Component({
  selector: 'app-inference-graf',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './inference-graf.component.html',
  styleUrl: './inference-graf.component.css'
})
export class InferenceGrafComponent {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor() {
    this.chartOptions = {
      series: [20, 50, 30],
      chart: {
        type: "donut"
      },
      labels: ["Statement", "Assumption", "Denial"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ],
      dataLabels: {
        style: {
          colors: ["#ffffff"] // Color blanco para las letras
        }
      }
    };
  }
}
