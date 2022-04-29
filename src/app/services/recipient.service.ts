import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class RecipientService {

    constructor(
    private http: HttpClient
    ) { }

    public addNewRecipient(bodyService: any) {
    console.log(bodyService);
    const request = bodyService;

    return this.http.post<any>(
        'http://localhost:3000/api/v1/new_recipient', request, {});
    }

    public allRecipients() {  
    return this.http.get<any>(
        'http://localhost:3000/api/v1/all-recipients/', {});
    }

}
