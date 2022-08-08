import { Component, OnDestroy, OnInit } from '@angular/core';
import { BeersApiService } from '../../beers-api.service';
import { Beer } from '../../../../shared/models/beers.interface';
import { BeersService, QueryParamsBeers } from '../../beers.service';
import {
    BehaviorSubject,
    finalize,
    map,
    Observable,
    Subscription,
} from 'rxjs';


@Component({
    selector: 'app-beers-list',
    templateUrl: './beers-list.component.html',
    styleUrls: ['./beers-list.component.scss'],
})
export class BeersListComponent implements OnInit, OnDestroy {
    public beers: Beer[] = [];
    public moreToLoad = true;

    public loading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
    public showEmptyInfo$: Observable<boolean> = this.loading$
        .pipe(map(isLoading => !isLoading && !this.beers.length));


    private beersQueryParamsSubscription: Subscription;

    constructor(
        private beersApiService: BeersApiService,
        private beersService: BeersService,
    ) {
    }

    public ngOnInit(): void {
        this.beersQueryParamsSubscription = this.beersService.queryParams$
            .subscribe(
                params => this.getBeers(params)
            );
    }

    public ngOnDestroy() {
        this.beersQueryParamsSubscription.unsubscribe();
    }

    public onLoadMoreBeers() {
        this.beersService.loadMoreBeers();
    }

    private getBeers(params?: QueryParamsBeers) {
        this.loading$.next(true);
        this.beersApiService.getBeers(params)
            .pipe(
                finalize(() => this.loading$.next(false)),
            )
            .subscribe(
                (beers) => {
                    this.checkIfMoreToLoad(beers);
                    this.beersService.beersArray = [...this.beersService.beersArray, ...beers];
                    this.beers = this.beersService.beersArray;
                }
            );
    }

    private checkIfMoreToLoad(beers: Beer[]) {
        this.moreToLoad = !!beers.length;
    }
}
