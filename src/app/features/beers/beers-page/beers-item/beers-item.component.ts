import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Beer } from '../../models/beers.interface';
import { FavBeersService } from '../../../favorite-beers/fav-beers.service';
import { MatDialog } from '@angular/material/dialog';
import { BeersItemDetailComponent } from '../../beers-item-detail/beers-item-detail.component';
import { map, Subject, takeUntil } from 'rxjs';


@Component({
    selector: 'app-beers-item',
    templateUrl: './beers-item.component.html',
    styleUrls: ['./beers-item.component.scss']
})
export class BeersItemComponent implements OnInit, OnDestroy {
    @Input() beer!: Beer;
    public favBeersIDs: Beer['id'][];

    private destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(
        private dialog: MatDialog,
        private beerFavService: FavBeersService) {
    }

    public ngOnInit(): void {
        this.beerFavService.favBeers$
            .pipe(
                map(beers => beers.map(beer => beer.id)),
                takeUntil(this.destroy$)
            )
            .subscribe(
                (beersID => this.favBeersIDs = beersID)
            );
    }

    public toggleFavBtn(beer: Beer) {
        if (this.favBeersIDs.includes(beer.id)) {
            const favItemIndex = this.favBeersIDs.indexOf(beer.id);
            this.beerFavService.removeFromFav(favItemIndex);
            return;
        }
        this.beerFavService.addToFav(beer);
    }

    public showMoreInfo(beer: Beer) {
        this.dialog.open(BeersItemDetailComponent, {
            data: beer,
            maxHeight: '90vh',
            maxWidth: '700px',
            width: '90%'
        });
    }

    public ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
