import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Recipient } from 'src/app/models/cuenta';
import { RecipientService } from 'src/app/services/recipient.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit {
  public enterTitle = 'Transferir';
  public newRecipientForm: FormGroup;
  public newRecipient: Recipient;
  public arrayRecipient: any[] = [];
  public booleanEmit: boolean = false;


  constructor(
    private formBuilder: FormBuilder,
    private recipientService: RecipientService,
  ) { }

  ngOnInit(): void {
    this.recipientService.allRecipients().subscribe(
      (res:Recipient[]) => {
        this.arrayRecipient = Object.values(res);
      });
    this.newRecipientForm = this.formBuilder.group({});
  }

  public getObjetFromAutocomplete($even) {
    if ($even) {
      this.newRecipient = $even;
      this.booleanEmit = true;
      this.newRecipientForm = this.formBuilder.group({
          rut: this.newRecipient.rut,
          fullName: this.newRecipient.fullName,
          email: this.newRecipient.email,
          phone: this.newRecipient.phone,
          bankId: this.newRecipient.bankId,
          typeAccount: this.newRecipient.typeAccount,
          accountNumber: this.newRecipient.accountNumber,
          amount: ['', Validators.required]
        });
      }
    }



  public saveForm() {
    console.log('Form data is ', this.newRecipientForm.value);
  }

}
