
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BankService } from 'src/app/services/bank.service';

@NgModule({
    declarations: [],
    imports: [ReactiveFormsModule],
    providers: [BankService,
                ReactiveFormsModule],
    bootstrap: []
})
export class NewRecipientComponentModule { }
