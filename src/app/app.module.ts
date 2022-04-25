import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { GlobalHeaderComponent } from './components/global-header/global-header.component';
import { NewRecipientComponent } from './components/new-recipient/new-recipient.component';
import { TransferComponent } from './components/transfer/transfer.component';
import { TransferHistoryComponent } from './components/transfer-history/transfer-history.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    GlobalHeaderComponent,
    NewRecipientComponent,
    TransferComponent,
    TransferHistoryComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
