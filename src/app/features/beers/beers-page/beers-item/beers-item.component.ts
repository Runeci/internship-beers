import { Component, Input, OnInit } from '@angular/core';
import { Beer } from '../../../../shared/models/beers.interface';
import { FavBeersService } from '../../../favorite-beers/fav-beers.service';


@Component({
    selector: 'app-beers-item',
    templateUrl: './beers-item.component.html',
    styleUrls: ['./beers-item.component.scss']
})
export class BeersItemComponent implements OnInit {
    @Input() beer!: Beer;

    favBeersIDs: Beer['id'][];

    constructor(private beerFavService: FavBeersService) {
    }

    public ngOnInit(): void {
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
