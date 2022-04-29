import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_BACKEND } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransferServiceService {
  

  constructor(
    private http: HttpClient
  ) { }

  public addNewtransfer(bodyService: any) {
    console.log(bodyService);
    console.log(BASE_BACKEND+'/new_recipient/');
    const request = bodyService;

    return this.http.post<any>(
      'http://localhost:3000/api/v1/transfer', request, {});
  }

  public historyTransfer() {  
    return this.http.get<any>(
      'http://localhost:3000/api/v1/history-transfers/', {});
  }

  public transferById() {

  }
}
