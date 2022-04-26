import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewRecipientComponent } from './components/new-recipient/new-recipient.component';
import { TransferHistoryComponent } from './components/transfer-history/transfer-history.component';
import { TransferComponent } from './components/transfer/transfer.component';

const APP_ROUTES: Routes = [
  { path: 'nuevo-destinatario', component: NewRecipientComponent },
  { path: 'transferir', component: TransferComponent },
  { path: 'historial', component: TransferHistoryComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'nuevo-destinatario'}
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
