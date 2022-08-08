import { Component, Input, OnInit } from '@angular/core';
import { Beer } from '../../../../shared/models/beers.interface';
import { BeersFavService } from '../../beers-fav.service';

@Component({
    selector: 'app-beers-item',
    templateUrl: './beers-item.component.html',
    styleUrls: ['./beers-item.component.scss']
})
export class BeersItemComponent implements OnInit {
    @Input() beer!: Beer;

    favBeersIDs: Beer['id'][];

    constructor(private beerFavService: BeersFavService) {
    }

    public ngOnInit(): void {
        this.favBeersIDs = this.beerFavService.favItems;
    }

    public toggleFavBtn(beerId: Beer['id']) {
        if (this.beerFavService.favItems.includes(beerId)) {
            const favItemIndex = this.beerFavService.favItems.indexOf(beerId);
            this.beerFavService.removeFromFav(favItemIndex);
        } else {
            this.beerFavService.addToFav(beerId);
        }
    }

}
