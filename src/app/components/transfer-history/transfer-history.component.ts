import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transfer-history',
  templateUrl: './transfer-history.component.html',
  styleUrls: ['./transfer-history.component.scss']
})
export class TransferHistoryComponent implements OnInit {
  public enterTitle: string = 'Historial de Transferencia';

  constructor() { }

  ngOnInit(): void {
  }

}
