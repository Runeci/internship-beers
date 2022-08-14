import { Injectable } from '@angular/core';
import { Beer } from '../beers/models/beers.interface';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FavBeersService {
    public favBeers$: BehaviorSubject<Beer[]>;

    constructor(private lsService: LocalStorageService) {
        const favBeers = this.lsService.getFromLocalStorage('fav') || [];
        this.favBeers$ = new BehaviorSubject<Beer[]>(favBeers);
    }

    public addToFav(favBeer: Beer): void {
        this.favBeers$.next([...this.favBeers$.getValue(), favBeer]);
        this.lsService.saveToLocalStorage('fav', this.favBeers$.getValue());
    }

    public removeFromFav(favBeerIndex: number) {
        this.favBeers$.getValue().splice(favBeerIndex, 1);
        this.favBeers$.next(this.favBeers$.getValue()) ;
        this.lsService.saveToLocalStorage('fav', this.favBeers$.getValue());
    }
}
