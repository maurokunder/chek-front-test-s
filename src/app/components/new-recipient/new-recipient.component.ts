import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MediaObserver, MediaChange} from '@angular/flex-layout';
import { Bank, TypeAccount } from 'src/app/models/cuenta';
import { BankService } from 'src/app/services/bank.service';
import { RecipientService } from 'src/app/services/recipient.service';
import { RutValidator } from 'ng2-rut';

@Component({
  selector: 'app-new-recipient',
  templateUrl: './new-recipient.component.html',
  styleUrls: ['./new-recipient.component.scss']
})
export class NewRecipientComponent implements OnInit {

  public newRecipientForm: FormGroup;
  public enterTitle = 'Nuevo Destinatario';
  public returnClassSize: string;
  public typeAccounts: TypeAccount[] = [];
  public obtainBanks: Bank[] = [];
  mediaSub: Subscription;
  deviceXs: boolean;

  constructor(
    private formBuilder: FormBuilder,
    public mediaObserver: MediaObserver,
    private bankService: BankService,
    private recipientService: RecipientService,
    private rutValidator: RutValidator
  ) { }

  public ngOnInit(): void {
    this.newRecipientForm = this.formBuilder.group({
      rut: ['', [Validators.required, this.rutValidator]],
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      bankId: ['', [Validators.required]],
      typeAccount: ['', [Validators.required]],
      accountNumber: ['', [Validators.required]],
    });
    this.mediaSub = this.mediaObserver.media$.subscribe((result: MediaChange) => {
      // console.log(result.mqAlias);
      this.deviceXs = result.mqAlias === 'xs' ? true : false;
      this.returnClassSize = this.deviceXs ? 'mobile-width' : 'desktot-width';
      console.log(this.returnClassSize);
    });
    this.bankService.getParams().subscribe(
      (result) => {
        this.obtainBanks = result.banks;
      }
    );

    this.typeAccounts = [
      { value: 'account-0', viewValue: 'Cuenta Corriente' },
      { value: 'account-1', viewValue: 'Cuenta Vista' },
      { value: 'account-2', viewValue: 'Cuenta Ahorro' },
    ];
  }

  public saveForm() {
    const returnValue = this.findTypeAccount(this.newRecipientForm.value);
    this.newRecipientForm.value['typeAccount'] = returnValue;
    if (this.newRecipientForm.valid) {
      console.log('Form data is ', this.newRecipientForm.value);
      this.recipientService.addNewRecipient(this.newRecipientForm.value).subscribe();
      this.newRecipientForm.reset();
    }
  }

  public findTypeAccount (value: any): any {
    const account = this.typeAccounts.find((r) => r.value === value['typeAccount']);
    return account.viewValue;
  }
}
