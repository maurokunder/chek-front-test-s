import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Bank, Recipient } from 'src/app/models/cuenta';
import { BankService } from 'src/app/services/bank.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit {
  public enterTitle = 'Transferir';
  public newRecipientForm: FormGroup;
  public newRecipient: Recipient;
  typeAccounts = [
    { value: 'account-0', viewValue: 'Cuenta Corriente' },
    { value: 'account-1', viewValue: 'Cuenta Vista' },
    { value: 'account-2', viewValue: 'Cuenta Ahorro' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private bankService: BankService,
  ) { }

  async ngOnInit(): Promise<void> {
  this.obtainBank('0000003').then((r) => {
      this.newRecipient = {
        rut: '16.806.320-2',
        fullName: 'Mauricio Oyarzun',
        email: 'moyarzun@gmail.com',
        phone: '934432579',
        bankId:r,
        typeAccount: this.obtainTypeAccount('account-1'),
        accountNumber: '123123123'
      }
      console.log(this.newRecipient);
    });

    this.newRecipientForm = this.formBuilder.group({
      rut: '16.806.320-2',
      fullName: 'Mauricio Oyarzun',
      email: 'moyarzun@gmail.com',
      phone: '934432579',
      bankId: '00001',
      typeAccount: this.obtainTypeAccount('account-1'),
      accountNumber: '123123123',
      amount: [, Validators.required]
    });
  }

  public async obtainBank(bankId: string): Promise<string> {
    let banks = await this.bankService.getParams().toPromise().then(r => r);
    let bank = banks.banks.find((res)=> res.id === bankId )
    return bank.name;
  }

  public obtainTypeAccount(id: string): string {
    const value = this.typeAccounts.find((ret) => ret.value === id);
    return value.viewValue;
  }

  public saveForm() {
    console.log('Form data is ', this.newRecipientForm.value);
  }

}
