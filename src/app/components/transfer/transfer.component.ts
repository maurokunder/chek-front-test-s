import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Recipient } from 'src/app/models/cuenta';
import { RecipientService } from 'src/app/services/recipient.service';
import { TransferServiceService } from 'src/app/services/transfer-service.service';

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
    private recipientService: RecipientService,
    private trasnferService: TransferServiceService,
  ) { }

  ngOnInit(): void {
    this.recipientService.allRecipients().subscribe(
      (res:Recipient[]) => {
        this.arrayRecipient = Object.values(res);
      });
    this.newRecipientForm = new FormGroup({});
  }

  public getObjetFromAutocomplete($even) {
    if ($even) {
      this.newRecipient = $even;
      this.booleanEmit = true;
      this.newRecipientForm = new FormGroup({
          rut: new FormControl(this.newRecipient.rut),
          fullName: new FormControl(this.newRecipient.fullName),
          email: new FormControl(this.newRecipient.email),
          phone: new FormControl(this.newRecipient.phone),
          bankId: new FormControl(this.newRecipient.bankId),
          typeAccount: new FormControl(this.newRecipient.typeAccount),
          accountNumber: new FormControl(this.newRecipient.accountNumber),
          amount: new FormControl()
        });
      }
    }

  public saveForm() {
    console.log('Form data is ', this.newRecipientForm.value);
    this.trasnferService.addNewtransfer(this.newRecipientForm.value).subscribe();
    this.newRecipientForm.reset();
  }

}
