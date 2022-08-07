import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
    @ViewChild('searchInput') searchInput: ElementRef;
    public searchControl: FormControl;
    public resentSearches: string[] = [];
    public resentIsOpened = false;

    private queryParamsSubscription: Subscription;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
    ) {
    }

    public ngOnInit(): void {
        this.searchControl = new FormControl('', Validators.pattern('^[a-z A-Z 0-9]+$'));

        this.queryParamsSubscription = this.activatedRoute.queryParams
            .subscribe(params => {
                    const searchInputVal = params['search'] ?
                        params['search'].trim().replace('_', ' ') :
                        '';
                    this.searchControl.setValue(searchInputVal);
                },
            );
    }

    public onSearch(event: Event): void {
        if (this.searchControl.invalid) {
            return
        }

        event.stopPropagation();

        const searchVal = this.searchControl.value
            .trim()
            .replace(' ', '_');

        this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: { search: searchVal || null },
            queryParamsHandling: 'merge',
        });

        this.saveToResentSearches();
    }

    public resetSearchControl(): void {
        this.searchControl.reset();
        this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: { search: null },
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
