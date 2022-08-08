import {
    AfterViewInit,
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    Renderer2,
    ViewChild
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { BeersService } from '../beers/beers.service';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('resentSearchesList', { read: ElementRef }) resentSearchesListRef: ElementRef;
    @ViewChild('searchInput') searchInputRef: ElementRef;

    public searchControl: FormControl;
    public resentSearches: string[] = [];
    public resentIsOpened = false;

    private clickEvent$: Observable<Event> = fromEvent(document, 'click');
    private clickEventSubscription: Subscription;
    private queryParamsSubscription: Subscription;

    constructor(
        private renderer: Renderer2,
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

    public ngAfterViewInit() {
        this.clickEventSubscription = this.clickEvent$.subscribe(
            (event) => {
                const resentListEl = this.searchInputRef.nativeElement;
                const searchInputEl = this.searchInputRef.nativeElement;
                if (searchInputEl === event.target) {
                    this.resentIsOpened = true;
                }
                if (resentListEl) {
                    this.resentIsOpened = !!resentListEl.contains(event.target);
                }
            }
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

        this.navigate(searchVal);

        this.saveToResentSearches();
    }

    public resetSearchControl(): void {
        this.beersService.clearBeers();
        this.searchControl.reset();
        this.navigate();
    }

    public recallSearch(search: string) {
        this.beersService.clearBeers();
        this.navigate(search);
        this.resentIsOpened = false;
    }

    public ngOnDestroy(): void {
        this.queryParamsSubscription.unsubscribe();
        this.clickEventSubscription.unsubscribe();
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

    private navigate(searchParam: string = null) {
        this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: { beer_name: searchParam },
            queryParamsHandling: 'merge',
        });
    }

}
