import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BeersService } from '../beers/beers.service';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
    public searchControl: FormControl;
    public resentSearches: string[] = [];
    public resentIsOpened = false;

    private queryParamsSubscription: Subscription;

    constructor(
        private beersService: BeersService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
    ) {
    }

    public ngOnInit(): void {
        this.searchControl = new FormControl('', Validators.pattern('^[a-z A-Z 0-9]+$'));

        this.queryParamsSubscription = this.activatedRoute.queryParams
            .subscribe(params => {
                    const searchInputVal = params['beer_name'] ?
                        params['beer_name'].trim().replace('_', ' ') :
                        '';
                    this.searchControl.setValue(searchInputVal);
                },
            );
    }

    public onSearch(event: Event): void {
        if (this.searchControl.invalid) {
            return;
        }
        event.stopPropagation();

        this.beersService.clearBeers();

        const searchVal = this.searchControl.value
            .trim()
            .replace(' ', '_');

        this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: {
                beer_name: searchVal || null,
            },
            queryParamsHandling: 'merge',
        });

        this.saveToResentSearches();
    }

    public resetSearchControl(): void {
        this.beersService.clearBeers();
        this.searchControl.reset();
        this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: { beer_name: null },
            queryParamsHandling: 'merge',
        });
    }

    public ngOnDestroy(): void {
        this.queryParamsSubscription.unsubscribe();
    }

    private saveToResentSearches(): void {
        const searchValue = this.searchControl.value.trim();
        const resentSearchesAmount = this.resentSearches.length;
        const maxResentSearchesAmount = 5;
        const searchAlreadyExists = this.resentSearches.includes(searchValue);

        this.resentIsOpened = false;

        if (!searchValue || searchAlreadyExists) {
            return;
        }
        if (resentSearchesAmount > maxResentSearchesAmount - 1) {
            this.resentSearches.pop();
        }
        this.resentSearches.unshift(searchValue);
    }

}
