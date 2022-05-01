import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class RecipientService {

    constructor(
    private http: HttpClient
    ) { }

    public addNewRecipient(bodyService: any) {
    const request = bodyService;

    return this.http.post<any>(
        `${environment.backendUrl}/new_recipient`, request, {});
    }

    public allRecipients() {  
    return this.http.get<any>(
        `${environment.backendUrl}/all-recipients`, {});
    }

}
