import { Component, OnInit } from '@angular/core';
import { FavBeersService } from '../fav-beers.service';
import { Beer } from '../../../shared/models/beers.interface';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-favorite-beers-modal',
    templateUrl: './favorite-beers-modal.component.html',
    styleUrls: ['./favorite-beers-modal.component.scss']
})
export class FavoriteBeersModalComponent implements OnInit {
    public favItems: Beer[];

    constructor(
        private dialog: MatDialog,
        private dialogRef: MatDialogRef<FavoriteBeersModalComponent>,
        private favBeerService: FavBeersService) {
    }

    public ngOnInit(): void {
        this.favItems = this.favBeerService.favItems;
    }

}
