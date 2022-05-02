import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Recipient, Transfer } from 'src/app/models/cuenta';
import { RecipientService } from 'src/app/services/recipient.service';
import { TransferServiceService } from 'src/app/services/transfer-service.service';
import swal from 'sweetalert';
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
  public booleanAmount: boolean = false;
  public amountAvailable:number = 600000;
  public  totalAmount = 0;


  constructor(
    private recipientService: RecipientService,
    private trasnferService: TransferServiceService,
  ) { }

  ngOnInit(): void {
    
    this.recipientService.allRecipients().subscribe(
      (res:Recipient[]) => {
        this.arrayRecipient = Object.values(res);
      },
        err => { 
          if (err){
            swal('Destinatarios', 'Ocurrio un problema al cargar los destinatarios', 'error')
          }
      });
    this.trasnferService.historyTransfer().subscribe(
      (res:Transfer[]) => {
        if (res) {
          for (const iterator of res) {
            this.totalAmount = this.totalAmount + iterator.amount;       
          }
          this.totalAmount = this.amountAvailable - this.totalAmount;
        } else {
          this.totalAmount = this.amountAvailable;
        }
      }
    );
    this.newRecipientForm = new FormGroup({});
  }

  public get amountValid() {
    return this.newRecipientForm.get('amount').invalid && this.newRecipientForm.get('amount').touched;
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
          amount: new FormControl('', [Validators.required])
        });
      }
    }

  public saveForm() {
    console.log(this.totalAmount);
    //console.log('Form data is ', this.newRecipientForm.value);
    if (this.newRecipientForm.valid && this.newRecipientForm.value['amount'] > 0) {
      if (this.newRecipientForm.value['amount'] > this.totalAmount){
        swal('Nueva Transferencia', 'El monto a transferir es mayor al cupo disponible', 'error')
      } else {        
        this.trasnferService.addNewtransfer(this.newRecipientForm.value).subscribe(
          res => { 
            if (res) {
                swal('Nueva Transferencia', 'Su transferencia se realizo con exito', 'success');
            }
        },
          err => { 
            if (err){
              swal('Nueva Transferencia', 'Ocurrio un problema con su transferencia', 'error')
            }
        });
        this.newRecipientForm.reset();
      }
    } else {
      swal('Nueva Transferencia', 'Su transferencia no tiene un monto valido', 'error');
    }
  }
  
  public amountValidation ($even) {
    if ($even.target.value < 1) {
      $even.target.value = '';
      this.booleanAmount = false;
    } else {
      this.booleanAmount = true;
    }
  }

}
