import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MediaObserver, MediaChange} from '@angular/flex-layout';
import { Bank, TypeAccount } from 'src/app/models/cuenta';
import { BankService } from 'src/app/services/bank.service';

@Component({
  selector: 'app-new-recipient',
  templateUrl: './new-recipient.component.html',
  styleUrls: ['./new-recipient.component.scss']
})
export class NewRecipientComponent implements OnInit {
  

  public newRecipientForm: FormGroup;
  public enterTitle: string = 'Nuevo Destinatario'; 
  public returnClassSize: string;
  public typeAccounts: TypeAccount[] = [];
  public obtainBanks: Bank[] = [];
  mediaSub: Subscription;
  deviceXs: boolean;

  constructor(
    private formBuilder: FormBuilder,
    public mediaObserver: MediaObserver,
    private bankService: BankService
  ) { }

  public ngOnInit(): void {
    
    this.newRecipientForm = this.formBuilder.group({
      rut:['',[Validators.required]],
      fullName:['',[Validators.required]],
      email:['', [Validators.required, Validators.email]],
      phone:['', [Validators.required]],
      bankId:['', [Validators.required]],
      typeAccount:['', [Validators.required]],
      accountNumber:['', [Validators.required]],
    });
    this.mediaSub = this.mediaObserver.media$.subscribe((result: MediaChange) => {
      // console.log(result.mqAlias);
      this.deviceXs = result.mqAlias === 'xs' ? true : false;
      this.returnClassSize = this.deviceXs ? 'mobile-width' : 'example-full-width';
      console.log(this.returnClassSize);
    }); 
    this.bankService.getParams().subscribe(
      (result) => {
        this.obtainBanks = result.banks;
      }
    );
      
    this.typeAccounts = [
      { value: 'cuenta-0', viewValue: 'Cuenta Corriente' },
      { value: 'cuenta-1', viewValue: 'Cuenta Vista' },
      { value: 'cuenta-2', viewValue: 'Cuenta Ahorro' },
    ];
  }

  public saveForm(){
    console.log('Form data is ', this.newRecipientForm.value);
  }

}
