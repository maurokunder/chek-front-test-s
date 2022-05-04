import { Component, OnInit } from '@angular/core';
import { TransferServiceService } from 'src/app/services/transfer-service.service';
import { MediaObserver, MediaChange} from '@angular/flex-layout';
import swal from 'sweetalert';
import { Subscription } from 'rxjs';
import { Transfer } from 'src/app/models/cuenta';

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
  constructor(
    private transferService: TransferServiceService,
    public mediaObserver: MediaObserver,
  ) { }

  ngOnInit(): void {
    this.mediaSub = this.mediaObserver.media$.subscribe((result: MediaChange) => {
      this.deviceXs = result.mqAlias === 'xs' ? true : false;
      const desktopColumn = ['Nombre Destinatario', 'Rut', 'Banco', 'Tipo de Cuenta', 'Monto'];
      const xsColumn = ['Rut', 'Banco', 'Monto']
      this.returnColumns = this.deviceXs ? xsColumn : desktopColumn;
    });
    this.transferService.historyTransfer().subscribe(
      (response: any[]) => {
        this.arrayService = response.sort((a,b) => { 
          return Date.parse(b.createdAt) - Date.parse(a.createdAt);
        });
        this.arrayService = this.arrayService.map((res) => {
          const value: Transfer = {
            rut: res.rut,
            fullName: res.fullName,
            email: res.email,
            phone: res.phone,
            bankId: res.bankId,
            typeAccount: res.typeAccount,
            accountNumber: res.accountNumber,
            amount: this.formatCurrency(res.amount)
          }
          console.log(value);
          return value;
        });
    },
    err => { 
      if (err){
        swal('Historial', 'Ocurrio un problema al cargar el historial de transferencias', 'error')
      }
    });
  }

  public formatCurrency(currency: number): any {
    const money = new Intl.NumberFormat('de-DE').format(currency);
    return money;
  }

}