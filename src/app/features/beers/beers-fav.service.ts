import { Injectable } from '@angular/core';
import { Beer } from '../../shared/models/beers.interface';

@Injectable({
    providedIn: 'root'
})
export class BeersFavService {
    public favItems: Beer['id'][] = [];

    constructor() {
    }

    public addToFav(favBeerId: Beer['id']): void {
        this.favItems.push(favBeerId);
    }

    public removeFromFav(favBeerIndex: number) {
        this.favItems.splice(favBeerIndex, 1);
    }
}
