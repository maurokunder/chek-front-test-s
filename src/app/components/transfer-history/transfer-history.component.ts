import { Component, OnInit } from '@angular/core';
import { TransferServiceService } from 'src/app/services/transfer-service.service';

@Component({
  selector: 'app-transfer-history',
  templateUrl: './transfer-history.component.html',
  styleUrls: ['./transfer-history.component.scss']
})
export class TransferHistoryComponent implements OnInit {
  public enterTitle = 'Historial de Transferencia';
  public arrayService = [];
  displayedColumns: string[] = ['Nombre Destinatario', 'Rut', 'Banco', 'Tipo de Cuenta', 'Monto'];

  constructor(
    private transferService: TransferServiceService,
  ) { }

  ngOnInit(): void {
    this.transferService.historyTransfer().subscribe(
      (response: any[]) => {
        this.arrayService = response.sort((a,b) => { 
          return Date.parse(b.createdAt) - Date.parse(a.createdAt); 
      });
    });
  }

}