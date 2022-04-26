import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FlexModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';


import { AppComponent } from './app.component';
import { GlobalHeaderComponent } from './components/global-header/global-header.component';
import { NewRecipientComponent } from './components/new-recipient/new-recipient.component';
import { TransferComponent } from './components/transfer/transfer.component';
import { TransferHistoryComponent } from './components/transfer-history/transfer-history.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { TitleComponentComponent } from './components/title-component/title-component.component';
import { NewRecipientComponentModule } from './components/new-recipient/new-recipient.module';
import { HttpClientModule } from '@angular/common/http';
import { AutocompleteComponentComponent } from './autocomplete-component/autocomplete-component.component';

@NgModule({
  declarations: [
    AppComponent,
    GlobalHeaderComponent,
    NewRecipientComponent,
    TransferComponent,
    TransferHistoryComponent,
    TitleComponentComponent,
    AutocompleteComponentComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    AppRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    NewRecipientComponentModule,
    HttpClientModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
