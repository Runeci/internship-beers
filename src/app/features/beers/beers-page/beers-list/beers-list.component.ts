import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { BeersApiService } from '../../beers-api.service';
import { Beer } from '../../models/beers.interface';
import { BeersService, QueryParamsBeersSettings } from '../../beers.service';
import { BehaviorSubject, finalize, map, Observable, Subject, switchMap, take, takeUntil, tap, } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { BEERS_COUNT_PER_PAGE, DEFAULT_PAGE_QUERY } from '../../consts/beers.consts';


@Component({
    selector: 'app-beers-list',
    templateUrl: './beers-list.component.html',
    styleUrls: ['./beers-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BeersListComponent implements OnInit, OnDestroy {
    public beers: Beer[] = [];
    public moreToLoad = true;

    public loading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
    public showEmptyInfo$: Observable<boolean> = this.loading$
        .pipe(map(isLoading => !isLoading && !this.beers.length));

    private destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(
        private beersApiService: BeersApiService,
        private beersService: BeersService,
        private activatedRoute: ActivatedRoute,
    ) {
    }

    public ngOnInit(): void {
        this.activatedRoute.queryParams
            .pipe(
                switchMap(params => {
                    const queryParams = {
                        page: DEFAULT_PAGE_QUERY,
                        per_page: BEERS_COUNT_PER_PAGE,
                        ...params,
                    };
                    return this.getBeers(queryParams);
                }),
                takeUntil(this.destroy$)
            )
            .subscribe();
    }

    public ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    public onLoadMoreBeers(): void {
        const params = {
            ...this.activatedRoute.snapshot.queryParams,
            page: ++this.beersService.pageNumber,
        };
        this.getBeers(params).subscribe();
    }

    private getBeers(params?: QueryParamsBeersSettings): Observable<Beer[]> {
        this.loading$.next(true);
        return this.beersApiService.getBeers(params)
            .pipe(
                tap((beers) => {
                    this.checkIfMoreToLoad(beers);
                    this.beersService.saveToBeers(beers);
                    this.beers = this.beersService.beersArray;
                }),
                finalize(() => this.loading$.next(false)),
                take(1),
            );
    }

    private checkIfMoreToLoad(beers: Beer[]): void {
        this.moreToLoad = !!beers.length;
    }
}
