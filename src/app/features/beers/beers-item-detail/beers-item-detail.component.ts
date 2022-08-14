import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Beer } from '../models/beers.interface';
import { FavBeersService } from '../../favorite-beers/fav-beers.service';
import { map, Observable } from 'rxjs';

@Component({
    selector: 'app-beers-item-detail',
    templateUrl: './beers-item-detail.component.html',
    styleUrls: ['./beers-item-detail.component.scss']
})
export class BeersItemDetailComponent implements OnInit {
    public beerItem: Beer;
    public favBeersIDs$: Observable<Beer['id'][]>;

    constructor(
        private beerFavService: FavBeersService,
        @Inject(MAT_DIALOG_DATA) public dialogData: Beer,
    ) {
    }

    public ngOnInit(): void {
        this.beerItem = this.dialogData;
        this.favBeersIDs$ = this.beerFavService.favBeers$
            .pipe(
                map(beers => beers.map(beer => beer.id))
            );
    }

    public toggleFavBtn(beer: Beer) {
        const IDs = this.beerFavService.favBeers$.getValue().map(beer => beer.id);
        const favItemIndex = IDs.indexOf(beer.id);

        if (IDs.includes(beer.id)) {
            this.beerFavService.removeFromFav(favItemIndex);
            return;
        }
        this.beerFavService.addToFav(beer);
    }
}
