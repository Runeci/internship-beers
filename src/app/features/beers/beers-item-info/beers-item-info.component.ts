import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Beer } from '../../../shared/models/beers.interface';
import { FavBeersService } from '../../favorite-beers/fav-beers.service';

@Component({
    selector: 'app-beers-item-info',
    templateUrl: './beers-item-info.component.html',
    styleUrls: ['./beers-item-info.component.scss']
})
export class BeersItemInfoComponent implements OnInit {
    public beerItem: Beer;
    public favBeersIDs: Beer['id'][];

    constructor(
        private beerFavService: FavBeersService,
        @Inject(MAT_DIALOG_DATA) public dialogData: Beer,
    ) {
    }

    public ngOnInit(): void {
        this.beerItem = this.dialogData;
        this.favBeersIDs = this.beerFavService.favItemsIDs;
    }

    public toggleFavBtn(beer: Beer) {
        if (this.beerFavService.favItemsIDs.includes(beer.id)) {
            const favItemIndex = this.beerFavService.favItemsIDs.indexOf(beer.id);
            this.beerFavService.removeFromFav(favItemIndex);
        } else {
            this.beerFavService.addToFav(beer);
        }
    }
}
