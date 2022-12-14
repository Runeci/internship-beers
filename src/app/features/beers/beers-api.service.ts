import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Beer } from './models/beers.interface';
import { Observable } from 'rxjs';
import { QueryParamsBeersSettings } from './beers.service';

export const BEERS_DATA_API = 'https://api.punkapi.com/v2';

@Injectable({
    providedIn: 'root'
})
export class BeersApiService {
    constructor(private http: HttpClient) {
    }

    public getBeers(queryParams: QueryParamsBeersSettings): Observable<Beer[]> {
        const params = new HttpParams({ fromObject: { ...queryParams } });
        return this.http.get<Beer[]>(
            `${ BEERS_DATA_API }/beers`,
            { params: params }
        );
    }
}
