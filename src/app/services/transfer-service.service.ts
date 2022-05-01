import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransferServiceService {
  

  constructor(
    private http: HttpClient
  ) { }

  public addNewtransfer(bodyService: any) {
    const request = bodyService;

    return this.http.post<any>(
      `${environment.backendUrl}/transfer`, request, {});
  }

  public historyTransfer() {  
    return this.http.get<any>(
      `${environment.backendUrl}/history-transfers/`, {});
  }

  public transferById() {

  }
}
