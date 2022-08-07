import { Injectable, OnInit } from '@angular/core';
import { Beer } from '../../shared/models/beers.interface';
import { BeersApiService } from './beers-api.service';
import { BehaviorSubject, delay, Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class BeersService {
    public beers$: BehaviorSubject<Beer[]> = new BehaviorSubject<Beer[]>([]);
    public searchParam: string;

    constructor(
        private activatedRoute: ActivatedRoute,
        private beersApiService: BeersApiService,
    ) {
        this.activatedRoute.queryParams
            .pipe(
                delay(0)
            )
            .subscribe(
            params => {
                this.searchParam = params['search'];
                this.getBeers();
            }
        );
    }

    public getBeers() {
        if (this.searchParam) {
            this.beersApiService.getBeersByName(this.searchParam)
                .subscribe(
                    (beers) => this.beers$.next(beers)
                )
            ;
        } else if (!this.searchParam) {
            this.beersApiService.getBeers(1)
                .subscribe(
                    (beers) => this.beers$.next(beers)
                );
        }
    }


}
