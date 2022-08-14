import { Injectable } from '@angular/core';
import { Beer } from './models/beers.interface';
import { BehaviorSubject } from 'rxjs';
import { DEFAULT_PAGE_QUERY } from './consts/beers.consts';

export interface QueryParamsBeersSettings {
    beer_name?: string,
    page?: number,
    per_page?: number
}

@Injectable({
    providedIn: 'root'
})

export class BeersService {
    public pageNumber = DEFAULT_PAGE_QUERY;
    public beersArray: Beer[] = [];
    public requestQueryParamsSettings$: BehaviorSubject<QueryParamsBeersSettings> = new BehaviorSubject({});

    public saveToBeers(beers: Beer[]): void {
        this.beersArray = [...this.beersArray, ...beers];
    }

    public clearBeers(): void {
        this.beersArray = [];
    }
}
