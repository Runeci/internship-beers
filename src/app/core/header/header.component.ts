import {
    ChangeDetectionStrategy,
    Component,
    OnInit,
} from '@angular/core';
import { FavBeersService } from '../../features/favorite-beers/fav-beers.service';

import {
    FavoriteBeersModalComponent
} from '../../features/favorite-beers/favorite-beers-modal/favorite-beers-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { map, Observable } from 'rxjs';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
    public favItemsAmount$: Observable<number>;

    constructor(
        private dialog: MatDialog,
        private beersFavService: FavBeersService,
    ) {
    }

    public ngOnInit(): void {
        this.favItemsAmount$ = this.beersFavService.favBeers$
            .pipe(
                map(beers => beers.length)
            );

    }

    public openFavorites(): void {
        this.dialog.open(FavoriteBeersModalComponent, {
            maxHeight: '90vh',
        });
    }
}
