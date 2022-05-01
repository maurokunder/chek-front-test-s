import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MediaObserver, MediaChange} from '@angular/flex-layout';
import { Bank, TypeAccount } from 'src/app/models/cuenta';
import { BankService } from 'src/app/services/bank.service';
import { RecipientService } from 'src/app/services/recipient.service';
import { validateRUT } from 'validar-rut'

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
  public validateRut: boolean = false;
  mediaSub: Subscription;
  deviceXs: boolean;

  constructor(
    public mediaObserver: MediaObserver,
    private bankService: BankService,
    private recipientService: RecipientService,
  ) { }

  public ngOnInit(): void {
    const patter_rut = RegExp('^0*(\d{1,3}(\.?\d{3})*)\-?([\dkK])$')
    this.newRecipientForm = new FormGroup({
      rut: new FormControl('', [Validators.required]),
      fullName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern('^[^@]+@[^@]+\.[a-zA-Z]{2,}$')]),
      phone: new FormControl('', [Validators.required, Validators.pattern("[0-9]+")]),
      bankId: new FormControl('',[Validators.required]),
      typeAccount: new FormControl('', [Validators.required]),
      accountNumber: new FormControl('', [Validators.required, Validators.pattern("[0-9]+")]),
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

  public get emailValid() {
    return this.newRecipientForm.get('email').invalid && this.newRecipientForm.get('email').touched;
  }

  public get rutValid() {
    return this.newRecipientForm.get('rut').invalid && this.newRecipientForm.get('rut').touched;
  }

  public get nameValid() {
    return this.newRecipientForm.get('fullName').invalid && this.newRecipientForm.get('fullName').touched;
  }

  public get phoneValid() {
    return this.newRecipientForm.get('phone').invalid && this.newRecipientForm.get('phone').touched;
  }

  public get accountValid() {
    return this.newRecipientForm.get('accountNumber').invalid && this.newRecipientForm.get('accountNumber').touched;
  }

  public get bankValid() {
    return this.newRecipientForm.get('bankId').invalid && this.newRecipientForm.get('bankId').touched;
  }

  public get typeAccountValid() {
    return this.newRecipientForm.get('typeAccount').invalid && this.newRecipientForm.get('typeAccount').touched;
  }

  public saveForm() {
    const returnValue = this.findTypeAccount(this.newRecipientForm.value);
    this.newRecipientForm.value['typeAccount'] = returnValue;
    if (this.newRecipientForm.valid) {
      console.log('Form data is ', this.newRecipientForm.value);
      //this.recipientService.addNewRecipient(this.newRecipientForm.value).subscribe();
      alert('Destinatario Ingresado con exito')
      this.newRecipientForm.reset();
    }
  }

  public findTypeAccount (value: any): any {
    const account = this.typeAccounts.find((r) => r.value === value['typeAccount']);
    return account.viewValue;
  }

  public formatCliente ($even) {
    $even.target.value = $even.target.value
    .replace(/[^0-9]/g, '')
    .replace( /^(\d{1,2})(\d{3})(\d{3})(\w{1})$/, '$1.$2.$3-$4');
    this.validateRut = validateRUT($even.target.value);
  }

  public formatName($even) {
    $even.target.value = $even.target.value
      .replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
  }
}
