import { Component, OnInit } from '@angular/core';
import { TransferServiceService } from 'src/app/services/transfer-service.service';
import { MediaObserver, MediaChange} from '@angular/flex-layout';
import swal from 'sweetalert';
import { Subscription } from 'rxjs';
import { Transfer } from 'src/app/models/cuenta';
import * as moment from 'moment';

@Component({
  selector: 'app-transfer-history',
  templateUrl: './transfer-history.component.html',
  styleUrls: ['./transfer-history.component.scss']
})
export class TransferHistoryComponent implements OnInit {
  public enterTitle = 'Historial de Transferencia';
  public arrayService = [];
  public returnColumns: string[] = [];
  mediaSub: Subscription;
  deviceXs: boolean;

  public MOBILE_BREAKPOINT: number = 768;
  public isMobile: boolean;
  public booleanFirstChargeSelectedDate: boolean = true;
  public selectedStartDateFirst: string;
  public selectedEndDateFirst: string;
  public startDateToChart: string;
  public endDateToChart: string;
  public fromMonthsAndYear: string[];
  public toMonthsAndYear: string[];
  public returnClassSize: string;
  public showDataInHtml: boolean = false;
  public searchResults: Transfer[];
  public dataForChart: Transfer[] = [];


  constructor(
    private transferService: TransferServiceService,
    public mediaObserver: MediaObserver,
  ) { }

  public ngOnInit(): void {
      this.isMobile = window.innerWidth <= this.MOBILE_BREAKPOINT;
      if (this.isMobile) {
        this.toMonthsAndYear = this.loadDates().reverse().slice(6, 12);
        this.fromMonthsAndYear = this.loadDates().reverse().slice(6, 12);
      } else {
        this.fromMonthsAndYear = this.loadDates().reverse();
        this.toMonthsAndYear = this.loadDates().reverse();
      }
      if (this.booleanFirstChargeSelectedDate) {
        const lenthToMonthsAndYear = this.toMonthsAndYear.length;
        this.selectedStartDateFirst = this.toMonthsAndYear[0];
        this.selectedEndDateFirst = this.toMonthsAndYear[lenthToMonthsAndYear - 1];
        this.startDateToChart = this.selectedStartDateFirst;
        this.endDateToChart = this.selectedEndDateFirst;
        this.goToCheckPaymentsTable();
      }
    
    this.mediaSub = this.mediaObserver.media$.subscribe((result: MediaChange) => {
      this.deviceXs = result.mqAlias === 'xs' ? true : false;
      const desktopColumn = ['Nombre Destinatario', 'Rut', 'Banco', 'Tipo de Cuenta', 'Monto'];
      const xsColumn = ['Rut', 'Banco', 'Monto']
      this.returnColumns = this.deviceXs ? xsColumn : desktopColumn;
      this.returnClassSize = this.deviceXs ? 'mobile-width' : 'desktot-width';
    });
  }

  public formatCurrency(currency: number): any {
    const money = new Intl.NumberFormat('de-DE').format(currency);
    return money;
  }

  public loadDates(length: number = 12): string[] {
    return Array.from(
      { length }, (_, i) => moment().subtract(i, 'months').startOf('month').format('YYYY-MM-DD HH:mm:ss'));
  }

  public async goToCheckPaymentsTable(): Promise<void> {

    this.transferService.historyTransfer().subscribe(
      (response: any[]) => {
        this.arrayService = response.sort((a,b) => { 
          return Date.parse(b.createdAt) - Date.parse(a.createdAt);
        });
        this.searchResults = this.dataForHistoryChartAndDataTable(this.arrayService);
        this.arrayService = this.arrayService.map((res) => {
          const value: Transfer = {
            rut: res.rut,
            fullName: res.fullName,
            email: res.email,
            phone: res.phone,
            bankId: res.bankId,
            typeAccount: res.typeAccount,
            accountNumber: res.accountNumber,
            amount: this.formatCurrency(res.amount),
            createdAt: res.createdAt
          }
          return value;
        });
    },
    err => { 
      if (err){
        swal('Historial', 'Ocurrio un problema al cargar el historial de transferencias', 'error')
      }
    });
  }

  public filterByDate(selectedStartDate: string, selectedEndDate: string,
                      arrayResponse: Transfer[]): Transfer[] {
    this.startDateToChart = selectedStartDate;
    this.endDateToChart = selectedEndDate;
    const dateStar = Number(moment(selectedStartDate).format('YYYYMM'));
    const dateEnd =  Number(moment(selectedEndDate).format('YYYYMM'));
    const returnValue  = arrayResponse.filter((response) => {
    const valueDate = moment(response.createdAt).format('YYYYMM');
    return (Number(valueDate) >= dateStar) && (Number(valueDate) <= dateEnd);
    }).sort((left, right) => {
      return moment(right.createdAt)
        .diff(moment(left.createdAt));
    });
    return returnValue;
  }

  public searchFirstAndEndDate(arrayIn:Transfer[]) {
    const lenghtArray = arrayIn.length;
    const dateReturn = (value: string): string => {
      const dateIn = moment(value).format('YYYY-MM');
      return this.toMonthsAndYear.find((resp) => moment(resp).format('YYYY-MM') === dateIn);
    };
    if (lenghtArray > 1) {
      this.selectedStartDateFirst = dateReturn(arrayIn[lenghtArray - 1].createdAt);
      this.selectedEndDateFirst = dateReturn(arrayIn[0].createdAt);
      this.filterByDate(this.selectedStartDateFirst, this.selectedEndDateFirst, arrayIn);
    } else {
      if (lenghtArray === 1) {
        this.selectedStartDateFirst = dateReturn(arrayIn[0].createdAt);
        this.selectedEndDateFirst = dateReturn(arrayIn[0].createdAt);
        this.filterByDate(this.selectedStartDateFirst, this.selectedEndDateFirst, arrayIn);
      }
    }
  }

  public dataForHistoryChartAndDataTable(array: Transfer[]): Transfer[] {
    let responseMovements: Transfer[] = [];
    if (array) {
      responseMovements = array;
      if (responseMovements.length > 0) {
        this.showDataInHtml = true;
      }

      const arrayAux: Transfer[] = [];
        const dateStart = Number(moment(this.selectedStartDateFirst).format('YYYYMM'));
        const dateEnd =  Number(moment(this.selectedEndDateFirst).format('YYYYMM'));
        let responsePaymentsCopy = responseMovements.filter(
          (movements) => {
            const valueDate = moment(movements.createdAt).format('YYYYMM');
            return (Number(valueDate) >= dateStart) && (Number(valueDate) <= dateEnd);
          });
        responsePaymentsCopy = responsePaymentsCopy.sort((min, max) => {
              return Number(max.createdAt) - Number(min.createdAt);
        });
        const dates = Array.from(new Set(responsePaymentsCopy.map((response) => {
          const returnValue = moment(response.createdAt).format('YYYY-MM');
          return returnValue;
        })));

        for (const item of dates) {
          let accumulative = 0;
          let dateAux = '';
          responsePaymentsCopy.map((_r, i, array) => {
            const dateArray = moment(array[i].createdAt).format('YYYY-MM');
            if (item === dateArray) {
              accumulative = accumulative + Number(array[i].amount);
              dateAux = array[i].createdAt;
            }
          });
          arrayAux.push({
            rut: '',
            fullName: '',
            email: '',            
            phone: '',
            bankId: '',
            typeAccount: '',
            accountNumber: '',
            amount: accumulative,
            createdAt: dateAux,
          });
        }
        this.dataForChart = arrayAux;
        this.searchFirstAndEndDate(responsePaymentsCopy);

        return responsePaymentsCopy;
    }
  }

  public formatDate(date: any, format: string = 'DD/MM/YYYY'): string {
    moment.locale('es');
    return moment(date).format(format);
  }


}