import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Beer } from '../../shared/models/beers.interface';
import { Observable } from 'rxjs';

const BEERS_DATA_API = 'https://api.punkapi.com/v2';
const BEERS_COUNT_PER_PAGE = 10;

@Injectable({
    providedIn: 'root'
})
export class BeersApiService {

    constructor(private http: HttpClient) {
    }

    public getBeers(page: number): Observable<Beer[]> {
        let params = new HttpParams()
            .set('page', page)
            .set('per_page', BEERS_COUNT_PER_PAGE);

        return this.http.get<Beer[]>(`${BEERS_DATA_API}/beers`, {params});
    }

    public getBeersByName(beerName: string): Observable<Beer[]>{
        let params = new HttpParams()
            .set('beer_name', beerName);
        return this.http.get<Beer[]>(`${BEERS_DATA_API}/beers`, {params});
    }
}
