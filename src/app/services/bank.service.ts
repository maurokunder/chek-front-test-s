import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class BankService {
    constructor(
        private http: HttpClient
    ) { }

    public getParams(): Observable<any> {
        return this.http.get(
            `https://bast.dev/api/banks.php`, {});
    }
}
