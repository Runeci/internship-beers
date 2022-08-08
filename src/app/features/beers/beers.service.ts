import { Injectable } from '@angular/core';
import { Beer } from '../../shared/models/beers.interface';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

export const BEERS_COUNT_PER_PAGE = 10;
export const DEFAULT_PAGE_QUERY = 1;

export interface QueryParamsBeers {
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
    public queryParams$: BehaviorSubject<QueryParamsBeers> = new BehaviorSubject({});

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
    ) {
        this.activatedRoute.queryParams
            .subscribe(
                params => {
                    const queryParams = {
                        page: DEFAULT_PAGE_QUERY,
                        per_page: BEERS_COUNT_PER_PAGE,
                        ...params,
                    };

                    this.queryParams$.next(queryParams);
                }
            );
    }

    public loadMoreBeers() {
        this.queryParams$.next(
            {
                ...this.queryParams$.getValue(),
                page: ++this.pageNumber,
            }
        );
    }

    public clearBeers() {
        this.beersArray = [];
    }
}
