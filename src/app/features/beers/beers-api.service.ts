import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Beer } from '../../shared/models/beers.interface';
import { Observable } from 'rxjs';

const BEERS_DATA_API = 'https://api.punkapi.com/v2';

@Injectable({
    providedIn: 'root'
})
export class BeersApiService {

    constructor(private http: HttpClient) {
    }

    public getBeers(): Observable<Beer[]> {
        return this.http.get<Beer[]>(`${BEERS_DATA_API}/beers`);
    }
}
