import { TitleCasePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as moment from 'moment';
import { Label } from 'ng2-charts';
import { Transfer } from 'src/app/models/cuenta';

@Component({
  selector: 'app-generic-chart',
  templateUrl: './generic-chart.component.html',
  styleUrls: ['./generic-chart.component.scss']
})
export class GenericChartComponent implements OnInit {
  @Input() public arrayPayments: Transfer[];
  @Input() public startDate: string;
  @Input() public endDate: string;

  public MOBILE_BREAKPOINT: number = 768;
  COLOR_PURPLE_CHART = '#573881';
  public max: number;
  public fromMonthsAndYear: string[] = [];
  public arrayColors: string[] = [];
  public prepareYearsAndMonths: string[] = [];
  public arrayPrepareBackground: string[] = [];
  public arrayDataFromPage: any[] = [];
  public isMobile: boolean;
  public chartColors: any[] = [{ backgroundColor: []}];
  public barChartOptions: ChartOptions = {};
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartData: ChartDataSets[] = [
    { data: [], label: '' },
  ];


  constructor() { }

  public ngOnInit() {
    this.initChart();
  }

  public initChart() {
    this.isMobile = window.innerWidth <= this.MOBILE_BREAKPOINT;
    this.fromMonthsAndYear = this.loadDates().reverse();
    if (this.isMobile) {
      this.barChartLabels = this.filterByDate(this.fromMonthsAndYear.slice(6, 13), this.startDate, this.endDate);
      if (this.arrayPayments) {
        this.arrayDataFromPage =
          this.createBarChartDataForHistory(this.arrayPayments, this.startDate, this.endDate);
      }
      this.max = this.createScaleForYAxes(Math.max(...this.arrayDataFromPage));
      this.setBarcharOptionsMobile(this.max);
      this.barChartData = [
        { data: this.arrayDataFromPage, label: 'Monto: $' },
      ];
    } else {
      this.barChartLabels = this.filterByDate(this.fromMonthsAndYear, this.startDate, this.endDate);
      this.barChartOptions = {
        responsive: true,
        scales : {
          yAxes: [{
            display: true,
            ticks: {
              min: 0
            },
            gridLines : {
              drawOnChartArea: false
            }
          }],
          xAxes: [{
            display: true,
            gridLines : {
              drawOnChartArea: false
            }
          }]
        }
      };
    }
    this.chartColors = [{backgroundColor: this.arrayColors}];
  }

  public createScaleForYAxes(max: number): number {
    const transformToString = String(max);
    const lenghtString = transformToString.length;
    let createNumberForScale = '';
    for (let i = 0; i <= lenghtString; i++ ) {
      if (i === 0) {
        createNumberForScale = createNumberForScale + '1';
      } else {
        createNumberForScale = createNumberForScale + '0';
      }
    }
    const calculatePercent = (max: number): number => ((100 * Math.trunc(max)) / Number(createNumberForScale));
    const returnValueForScale = (value: number): number => {
      if (value >= 75) {
        return Number(createNumberForScale);
      }
      if (value > 50 && value < 75) {
        createNumberForScale = createNumberForScale.replace(createNumberForScale.charAt(0), '7');
        createNumberForScale = createNumberForScale.replace(createNumberForScale.charAt(1), '5');
        createNumberForScale = createNumberForScale.substring(0, createNumberForScale.length - 1);
        return Number(createNumberForScale);
      }
      if (value > 25 && value <= 50) {
        createNumberForScale = createNumberForScale.replace(createNumberForScale.charAt(0), '5');
        createNumberForScale = createNumberForScale.substring(0, createNumberForScale.length - 1);
        return Number(createNumberForScale);
      }
      if (value > 15 && value <= 25) {
        createNumberForScale = createNumberForScale.replace(createNumberForScale.charAt(0), '2');
        createNumberForScale = createNumberForScale.replace(createNumberForScale.charAt(1), '5');
        createNumberForScale = createNumberForScale.substring(0, createNumberForScale.length - 1);
        return Number(createNumberForScale);
      }
      if (value <= 15) {
        createNumberForScale = createNumberForScale.replace(createNumberForScale.charAt(0), '1');
        createNumberForScale = createNumberForScale.replace(createNumberForScale.charAt(1), '5');
        createNumberForScale = createNumberForScale.substring(0, createNumberForScale.length - 1);
        return Number(createNumberForScale);
      }
    };
    return returnValueForScale(calculatePercent(max));
  }

  public ngOnChanges(): void {
    if (this.arrayPayments) {
      this.arrayDataFromPage =  this.createBarChartDataForHistory(this.arrayPayments, this.startDate, this.endDate);
    }
    if (this.isMobile) {
      this.max = this.createScaleForYAxes(Math.max(...this.arrayDataFromPage));
      this.setBarcharOptionsMobile(this.max);
      this.barChartLabels = this.filterByDate(this.fromMonthsAndYear.slice(6, 13), this.startDate, this.endDate);
      this.chartColors = [{backgroundColor: this.arrayColors}];
    } else {
      this.barChartLabels = this.filterByDate(this.fromMonthsAndYear, this.startDate, this.endDate);
      this.chartColors = [{backgroundColor: this.arrayColors}];
    }
    this.barChartData = [
      { data: this.arrayDataFromPage, label: 'Monto: $' },
    ];
  }

  public filterByDate(arrayString: string[], startDate: string, endDate: string): string[] {
    const returnValues = arrayString.filter((r) => {
      this.arrayColors.push(this.COLOR_PURPLE_CHART);
      return moment(startDate).isSameOrBefore(r) &&
          moment(endDate).isSameOrAfter(r);
    }).map((response) => {
      return new TitleCasePipe()
              .transform(String(moment(response)
              .format('MMM')).replace('.', '').trim());
    });
    return returnValues;
  }

  public setBarcharOptionsMobile(max: number) {
    this.barChartOptions = {
      responsive: true,
      scales : {
        yAxes: [{
          display: true,
          ticks: {
            min: 0,
            max: this.max,
            stepSize: Math.trunc(max / 5)
          },
          gridLines : {
            drawOnChartArea: false
          }
        }],
        xAxes: [{
          display: true,
          gridLines : {
            drawOnChartArea: false
          }
        }]
      }
    };
  }

  public createBarChartDataForHistory(arrayPayment: Transfer[], startDate: string, endDate: string) {
    const numbersData: number[] = [];
    let loadDates =  this.loadDates().reverse();
    let prepareDate: string[];
    const filterDate = (dates: string[]): string[] => {
          return dates.filter((response) => {
            return moment(startDate).isSameOrBefore(response) &&
            moment(endDate).isSameOrAfter(response);
        });
    };
    if (this.isMobile) {
      loadDates = loadDates.slice(6, 13);
      prepareDate = filterDate(loadDates).map((response) => {
          numbersData.push(0);
          return String(moment(response).format('YYYY-MM')).replace('.', '').trim();
        });
    } else {
        prepareDate = filterDate(loadDates).map((response) => {
          numbersData.push(0);
          return String(moment(response).format('YYYY-MM')).replace('.', '').trim();
      });
    }

    if (this.arrayPayments) {
      arrayPayment.map((res) => {
        const prev = String(moment(res.createdAt).format('YYYY-MM'));
        const findDate = prepareDate.findIndex((response) => response === prev);
        numbersData[findDate] = Number(res.amount);
      });
    }

    return numbersData;
  }

  public loadDates(length: number = 12): string[] {
    return Array.from(
      { length }, (_, i) => moment().subtract(i, 'months').startOf('month').format('YYYY-MM-DD HH:mm:ss'));
  }


}
