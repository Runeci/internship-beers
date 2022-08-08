import { Component, Input, OnInit } from '@angular/core';
import { Beer } from '../../../../shared/models/beers.interface';
import { FavBeersService } from '../../../favorite-beers/fav-beers.service';
import { MatDialog } from '@angular/material/dialog';
import { BeersItemInfoComponent } from '../../beers-item-info/beers-item-info.component';


@Component({
    selector: 'app-beers-item',
    templateUrl: './beers-item.component.html',
    styleUrls: ['./beers-item.component.scss']
})
export class BeersItemComponent implements OnInit {
    @Input() beer!: Beer;

    public favBeersIDs: Beer['id'][];

    constructor(
        private dialog: MatDialog,
        private beerFavService: FavBeersService) {
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

    public showMoreInfo(beer: Beer) {
        this.dialog.open(BeersItemInfoComponent, {
            data: beer,
            maxHeight: '90vh',
            maxWidth: '700px'
        })
    }
}
