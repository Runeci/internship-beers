import { Injectable } from '@angular/core';
import { Beer } from '../../shared/models/beers.interface';

@Injectable({
    providedIn: 'root'
})
export class FavBeersService {
    public favItems: Beer[] = [];
    public favItemsIDs: Beer['id'][] = [];

    constructor() {
    }

    public addToFav(favBeer: Beer): void {
        this.favItems.push(favBeer);
        this.favItemsIDs.push(favBeer.id);
    }

    public removeFromFav(favBeerIndex: number) {
        this.favItems.splice(favBeerIndex, 1);
        this.favItemsIDs.splice(favBeerIndex, 1);
    }
}
