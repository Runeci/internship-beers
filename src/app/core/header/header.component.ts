import { Component, OnInit } from '@angular/core';
import { FavBeersService } from '../../features/favorite-beers/fav-beers.service';
import { Beer } from '../../shared/models/beers.interface';
import {
    FavoriteBeersModalComponent
} from '../../features/favorite-beers/favorite-beers-modal/favorite-beers-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    public favItems: Beer['id'][];

    constructor(
        private dialog: MatDialog,
        private beersFavService: FavBeersService,
    ) {
    }

    public ngOnInit(): void {
        this.favItems = this.beersFavService.favItemsIDs;
    }

    public openFavorites(): void {
        this.dialog.open(FavoriteBeersModalComponent, {
            maxHeight: '90vh',
        });
    }
}
