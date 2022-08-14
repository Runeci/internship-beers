import { Component, OnInit } from '@angular/core';
import { FavBeersService } from '../fav-beers.service';
import { Beer } from '../../beers/models/beers.interface';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-favorite-beers-modal',
    templateUrl: './favorite-beers-modal.component.html',
    styleUrls: ['./favorite-beers-modal.component.scss']
})
export class FavoriteBeersModalComponent implements OnInit {
    public favItems$: BehaviorSubject<Beer[]>;

    constructor(
        private dialog: MatDialog,
        private dialogRef: MatDialogRef<FavoriteBeersModalComponent>,
        private favBeerService: FavBeersService) {
    }

    public ngOnInit(): void {
        this.favItems$ = this.favBeerService.favBeers$;
    }

    public onRemoveFav(favBeerIndex: Beer['id']): void {
        const favItemIndex = this.favItems$.getValue().map(beer => beer.id).indexOf(favBeerIndex);
        this.favBeerService.removeFromFav(favItemIndex);

        if (!this.favItems$.getValue().length) {
            this.dialogRef.close();
        }
    }
}
